# 04 — Task Breakdown (build order)

Legend: ☐ not started · ◐ in progress · ☑ done. **Update this file as you go.**
`[needs owner]` = blocked on something from the owner (see 05-open-items.md).

Work in phases; each phase ends in something demonstrable. Phases 1–5 can be
built and tested **without** a verified WhatsApp number.

## Phase 0 — Foundations

- ☐ **0.1** Provision a fresh managed Postgres (Neon via Vercel Marketplace).
  `[needs owner]` Set `DATABASE_URL` in Vercel. Do not reuse the EC2 database.
- ☐ **0.2** Choose migration tooling (Drizzle or plain SQL in `db/migrations/`).
  Write migration `001` for the tables in 02-architecture.md including the
  overlap exclusion constraint. Settle **integer cents** everywhere.
- ☐ **0.3** Replace `src/lib/db.ts` pool with `DATABASE_URL` support (already
  partly there). Add a typed query layer.
- ☐ **0.4** Env validation module (zod) that fails loudly when required vars
  are missing; update `.env.example`.
- ☐ **0.5** Test setup (Vitest). Pure logic must have unit tests: pricing,
  date overlap, state machine, ics parse/serialize.

## Phase 1 — Availability engine

- ☐ **1.1** `calendar_sources` seeded from env/admin; iCal importer
  (`node-ical`) → `external_blocks`. `[needs owner]` iCal export URLs.
- ☐ **1.2** `/api/cron/sync-calendars` (bearer `CRON_SECRET`), `vercel.json`
  cron every 5–10 min. Stale-source tracking, fail-closed logic.
- ☐ **1.3** `isAvailable()` combining external + manual + active direct
  bookings; min/max nights, lead time, max guests.
- ☐ **1.4** Published feed `/api/ical/direct.ics?token=` (confirmed + held).
- ☐ **1.5** Tests: back-to-back stays, check-out day free, multi-night
  overlaps, all-day DTEND exclusivity, stale feed fails closed.

## Phase 2 — Pricing and booking core

- ☐ **2.1** Pricing service from `settings` (nightly rate, weekend/seasonal
  rules, cleaning fee). `[needs owner]` rates and rules. Pure functions, tested.
- ☐ **2.2** Booking state machine module as the only writer of `status`; audit
  log; `hold_expires_at`; `/api/cron/expire-holds`.
- ☐ **2.3** Booking ref generator `TB14-YYYY-NNNN` (sequence-backed).
- ☐ **2.4** Concurrency test: two simultaneous holds on the same dates → exactly
  one succeeds (exclusion constraint).

## Phase 3 — Payments and invoices

- ☐ **3.1** Yoco checkout creation for an approved booking (cents, metadata,
  expiry). Refactor/replace `src/app/api/yoco/checkout/route.ts`; remove the
  `DIRECT_BOOKINGS_ENABLED` flag usage appropriately.
- ☐ **3.2** `/api/yoco/webhook` with signature verification, idempotency, late
  payment handling. `[needs owner]` new live key + webhook secret.
- ☐ **3.3** Invoice generation: sequential number, PDF with business details,
  booking ref, dates, line items, VAT if registered. `[needs owner]` legal
  entity, VAT status, address.
- ☐ **3.4** Email invoice via Resend; store PDF (Vercel Blob) and link it.

## Phase 4 — AI conversation engine (OpenRouter)

- ☐ **4.1** OpenRouter client (`src/lib/ai/openrouter.ts`): fetch wrapper,
  timeout, retry, fallback model, usage logging, spend guard. `[needs owner]`
  `OPENROUTER_API_KEY`; pick `OPENROUTER_MODEL` (tool-calling capable).
- ☐ **4.2** Tool definitions + zod validation: `check_availability`,
  `get_quote`, `create_hold`, `submit_for_approval`, `get_property_info`,
  `handoff_to_human`.
- ☐ **4.3** System prompt: persona, tone, rules (never invent price/availability,
  never promise anything not returned by a tool, refuse rule changes, handoff
  triggers). Store in `src/lib/ai/prompt.ts`.
- ☐ **4.4** Conversation orchestrator: load history, call model, execute tools,
  loop until final text, persist, return reply. Prompt-injection hardening.
- ☐ **4.5** Date parsing robustness ("next Friday for 2 nights") — the model
  extracts; code validates and **echoes dates back to the guest for
  confirmation** before holding.
- ☐ **4.6** Conversation eval set (`docs/whatsapp-booking/evals/`): scripted
  scenarios with expected tool calls. Run before changing model/prompt.

## Phase 5 — Admin dashboard (can start in parallel with Phase 4)

- ☐ **5.1** Auth with owner allow-list. `[needs owner]` admin emails.
- ☐ **5.2** Pages: Overview (KPIs), Bookings (list/detail/actions), Calendar
  (merged view with source colours + conflicts), Approvals queue,
  Conversations (transcript, take-over), Guests, Settings (rates, fees, rules,
  approver numbers, calendar URLs), Audit log.
- ☐ **5.3** Stats: bookings, revenue, occupancy, ADR, lead time, conversion
  funnel (chats → quotes → approvals → paid), average response time, AI cost,
  **fees saved vs platforms** (needs owner's commission % assumptions).
- ☐ **5.4** Manual actions: create/cancel booking, block dates, resend payment
  link/invoice, mark refunded, resolve conflict.
- ☐ **5.5** Design system: keep the site palette (white, charcoal, black only).

## Phase 6 — WhatsApp integration

- ☐ **6.1** Webhook route: GET verification; POST with signature check, dedupe,
  persistence. `[needs owner]` Meta app + verified business + number.
- ☐ **6.2** Outbound sender: text, interactive buttons, template, document.
  24h window awareness; template fallback.
- ☐ **6.3** Wire inbound text → orchestrator → reply.
- ☐ **6.4** Approval flow: send approval request to approvers with buttons;
  validate approver identity; first valid response wins; notify other approvers;
  guest gets payment link on approve or a polite message on decline/timeout.
- ☐ **6.5** Templates drafted in `templates.md` and submitted to Meta;
  track approval status.
- ☐ **6.6** Opt-out handling, rate limiting per number, abuse protection.

## Phase 7 — Hardening and launch

- ☐ **7.1** End-to-end test with Meta test number + Yoco test mode.
- ☐ **7.2** Double-booking drills: simulate a conflicting external booking;
  verify admin alert and manual-resolution path.
- ☐ **7.3** Observability: error monitoring (Sentry), uptime checks, alerts to
  WhatsApp/SMS for webhook failures, stale calendars, failed payments.
- ☐ **7.4** Update public site: `terms`, `privacy` (WhatsApp, OpenRouter, Yoco,
  Meta), `cancellation-policy` (direct bookings), `faq`, and add a "Book on
  WhatsApp" button (wa.me deep link) next to the platform links. Remove claims
  that "we do not take bookings directly".
- ☐ **7.5** Add the published iCal feed to Airbnb and Booking.com; verify they
  block a test booking. `[needs owner]`
- ☐ **7.6** Go-live checklist and rollback plan (disable bot = switch webhook
  off + auto-reply "message us on …").

## Existing code to reuse or retire

| File | Status |
| --- | --- |
| `src/app/api/yoco/checkout/route.ts` | Reuse idea; rewrite for new flow |
| `src/app/api/bookings/route.ts` | Disabled; replace |
| `src/app/api/send-booking-email/route.ts`, `request-refund/route.ts` | Disabled (open email relay); replace with server-side lookup |
| `src/app/book`, `track`, `timeline`, `BookingCalendar`, `useBookings` | Old web flow; retire or repurpose |
| `schema.sql`, `supabase-schema.sql`, `supabase/` | Obsolete; superseded by migrations |
| `next.config.ts` redirects for `/book`, `/track`, `/timeline` | Remove when decided |
