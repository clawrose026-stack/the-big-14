# 02 — Architecture

## Components

```
Guest (WhatsApp)
   │  ▲
   ▼  │
Meta WhatsApp Cloud API ──webhook──▶ /api/whatsapp/webhook
                                        │  (verify signature, dedupe, store msg)
                                        ▼
                               Conversation engine
                                 ├─ OpenRouter (LLM + tool calls)
                                 ├─ Availability service ◀── iCal importer (cron)
                                 ├─ Pricing service (pure code)
                                 └─ Booking service (state machine, DB)
                                        │
        ┌───────────────────────────────┼──────────────────────────┐
        ▼                               ▼                          ▼
 Approver WhatsApp msg          Yoco checkout + webhook      /api/ical/direct.ics
 (buttons → webhook)            /api/yoco/webhook            (imported by Airbnb/Booking.com)
                                        │
                                        ▼
                               Invoice (PDF) → WhatsApp + email (Resend)

Admin dashboard (/admin, authenticated) reads/writes the same DB.
```

## Tech choices

| Concern | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 16 App Router (existing) | API routes = webhooks |
| Hosting | Vercel (Pro required) | cron more often than daily needs Pro |
| Database | Managed Postgres (Neon via Vercel Marketplace recommended) | **Do not reuse the old EC2 DB** — credentials were leaked |
| DB access | `pg` (existing) or Drizzle | pick one, keep migrations in `db/migrations/` |
| AI | **OpenRouter only** | OpenAI-compatible HTTP API; model in env var |
| WhatsApp | Meta WhatsApp Cloud API (direct) | No BSP needed |
| Payments | Yoco Checkout API + webhooks | existing route in `src/app/api/yoco/checkout` is a starting point |
| Email | Resend (existing) | invoice copy, contact form |
| PDF | `@react-pdf/renderer` or `pdf-lib` | server-side, no headless browser |
| iCal | `node-ical` (parse); hand-written serializer or `ical-generator` (publish) | |
| Auth (dashboard) | Auth.js (email magic link / allow-list) or Vercel-compatible equivalent | allow-list of owner emails |
| Jobs | Vercel Cron → `/api/cron/*` protected by `CRON_SECRET` | |

## Data model (proposed — new migration, do not edit old `schema.sql`)

Existing `bookings` / `blocked_dates` in `schema.sql` are from the old
direct-booking flow. **Note:** it comments "amounts in cents" but older code
treated values as rands — **decide one convention (store integer cents) and
audit.** Prefer new tables below; migrate or retire the old ones.

- `guests` — id, wa_id (E.164, unique), name, email, phone, created_at
- `conversations` — id, guest_id, status (`active|awaiting_approval|closed`),
  last_message_at, context jsonb (collected dates, party size, etc.)
- `messages` — id, conversation_id, direction (`in|out`), wa_message_id
  (**unique**, for dedupe), body, type, raw jsonb, created_at
- `bookings` — id, ref (`TB14-YYYY-NNNN` unique), guest_id, check_in, check_out,
  nights, num_guests, status, price_cents, cleaning_fee_cents, total_cents,
  hold_expires_at, approved_by, approved_at, declined_reason, yoco_checkout_id,
  paid_at, invoice_number, source (`whatsapp`), created_at, updated_at
- `calendar_sources` — id, name (`airbnb|booking_com|lekkeslaap`), ics_url,
  last_synced_at, last_status, last_error
- `external_blocks` — id, source_id, uid, starts_on, ends_on, summary,
  fetched_at (replaced wholesale per sync)
- `manual_blocks` — id, starts_on, ends_on, reason
- `approvals` — id, booking_id, approver_wa_id, decision, decided_at,
  wa_message_id
- `payments` — id, booking_id, yoco_checkout_id, yoco_payment_id, amount_cents,
  status, raw jsonb, created_at
- `invoices` — id, booking_id, number (unique, sequential), pdf_url/blob,
  issued_at
- `audit_log` — id, actor, action, entity, entity_id, data jsonb, created_at
- `settings` — key/value (rates, fees, rules, approver numbers, templates)

Constraint: prevent overlapping active bookings with a Postgres exclusion
constraint:

```sql
CREATE EXTENSION IF NOT EXISTS btree_gist;
ALTER TABLE bookings ADD CONSTRAINT no_overlap EXCLUDE USING gist (
  daterange(check_in, check_out, '[)') WITH &&
) WHERE (status IN ('held','awaiting_approval','awaiting_payment','confirmed'));
```

Check-out day is free for the next check-in (half-open range `[)`).

## Booking state machine

```
inquiry ─▶ held ─▶ awaiting_approval ─▶ awaiting_payment ─▶ confirmed
              │            │                    │               │
              ▼            ▼                    ▼               ▼
           expired      declined             expired        cancelled / completed
```

- `held`: dates reserved, quote sent, details being collected.
- `awaiting_approval`: approver notified. Timeout → `expired`, guest told.
- `awaiting_payment`: Yoco link sent; expires after 30–60 min.
- `confirmed`: payment verified via webhook (never trust the redirect).
- Transitions live in one module (`src/lib/booking/state.ts`) and are the only
  code allowed to change `status`. Each writes an `audit_log` row.

## Availability service

`isAvailable(checkIn, checkOut)` returns free/blocked + reasons. A night is
blocked if any of: external_blocks (Airbnb/Booking/LekkeSlaap), manual_blocks,
or an active direct booking (including holds). Also enforce min/max nights,
max lead time, and max 2 guests.

**Fail closed:** if an iCal source is stale (> N minutes) or last sync errored,
treat availability as *unknown* and do not proceed to payment — tell the guest
we will confirm manually and alert the admin.

## Published feed

`GET /api/ical/direct.ics?token=<secret>` — VEVENTs for confirmed **and**
held/awaiting bookings. Use `VALUE=DATE` all-day events, DTEND = check-out
(exclusive). Summary generic ("Reserved") — **no guest data**. Unguessable
token in the URL. Platforms import this once.

## API routes (planned)

| Route | Purpose |
| --- | --- |
| `GET/POST /api/whatsapp/webhook` | verification handshake; inbound messages, statuses, button replies |
| `POST /api/yoco/webhook` | payment events; verify signature; idempotent |
| `GET /api/ical/direct.ics` | published feed |
| `GET /api/cron/sync-calendars` | pull iCal feeds (every 5–10 min) |
| `GET /api/cron/expire-holds` | expire stale holds/links, notify guest |
| `/api/admin/*` | dashboard data + actions (authenticated) |

All webhooks: verify signature, respond 200 fast, process idempotently, log
failures. Cron routes require `Authorization: Bearer $CRON_SECRET`.

## The AI conversation engine

- Model called through OpenRouter with **tool calling**. Tools (all
  server-implemented, deterministic):
  - `check_availability(check_in, check_out)`
  - `get_quote(check_in, check_out, guests)`
  - `create_hold(check_in, check_out, guests, guest_name)`
  - `submit_for_approval(booking_id)`
  - `get_property_info(topic)` — returns text from `property.ts` / policy pages
  - `handoff_to_human(reason)`
- The model **never** states a price or availability that did not come from a
  tool result. System prompt says so; code also validates.
- Keep conversation context in DB; send the last N messages + a compact
  summary. Strip/ignore any instructions inside guest messages that try to
  change rules (prompt injection). Tools enforce rules regardless.
- Rate-limit per guest; cap tokens per conversation; log token cost.
- Human handoff: a keyword or tool call flags the conversation for the admin;
  bot stops replying to it.
- Language: English first.

## Security & privacy

- Verify `X-Hub-Signature-256` on WhatsApp webhooks with the app secret.
- Verify Yoco webhook signatures. Never mark paid from a client redirect.
- Dashboard behind auth with an owner allow-list; no public admin routes.
- Store the minimum personal data (name, phone, email). Do **not** collect ID
  numbers unless the owner requires it — adds POPIA duty. Update
  `src/app/privacy/page.tsx` for WhatsApp, OpenRouter (cross-border processor),
  Yoco and Meta.
- Messages sent to OpenRouter contain guest text: disclose it; avoid sending
  unnecessary personal data in prompts.
- Secrets only in Vercel env vars. `.env.example` lists names, never values.
