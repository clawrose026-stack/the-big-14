# 03 — Integrations

> Verify details against current vendor docs before coding; APIs change.

## OpenRouter (all AI)

- Base URL `https://openrouter.ai/api/v1`, OpenAI-compatible
  `POST /chat/completions` with `Authorization: Bearer $OPENROUTER_API_KEY`.
- Use plain `fetch` or the OpenAI SDK pointed at the OpenRouter base URL. **Do
  not add vendor-specific SDKs.**
- Env: `OPENROUTER_API_KEY`, `OPENROUTER_MODEL` (primary),
  `OPENROUTER_FALLBACK_MODEL` (optional). Never hard-code a model slug.
- Choose a model that supports **tool/function calling** and is good at short,
  polite, multi-turn chat. Check the model's page on openrouter.ai for
  `tools` support and price. Make it swappable via env without a deploy.
- Optional headers `HTTP-Referer` and `X-Title` for attribution.
- Handle: timeouts, 429/5xx with retry + fallback model, and a safe canned reply
  ("One moment — let me get back to you") if the model is unavailable, plus an
  admin alert.
- Set a spend cap in the OpenRouter dashboard. Log `usage` per call.
- Use temperature low (≈0.2–0.4). Validate tool arguments with a schema (zod)
  before executing.

## WhatsApp Cloud API (Meta)

- Needs: Meta Business account (verified), a WhatsApp Business Account, a phone
  number **not registered on the normal WhatsApp app**, a permanent System User
  access token, phone number ID, app secret.
- Env: `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`,
  `WHATSAPP_APP_SECRET`, `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_APPROVER_NUMBERS`
  (comma-separated E.164 — or DB setting).
- **Webhook verification (GET):** echo `hub.challenge` when `hub.verify_token`
  matches `WHATSAPP_VERIFY_TOKEN`.
- **Inbound (POST):** verify `X-Hub-Signature-256` = HMAC-SHA256 of the raw body
  with the app secret. Parse `entry[].changes[].value.messages[]`; handle `text`
  and `interactive` (button replies). Dedupe on `message.id`. Return 200
  quickly; do the work after (use `after()`/background where supported).
- **24-hour window:** free-form messages are allowed only within 24h of the
  user's last message. Outside it you must use **pre-approved templates**.
  Approvers who have not recently messaged the bot need templates too — plan
  for it.
- **Templates to create and submit in Meta Business Manager** (utility
  category): `booking_approval_request` (with Approve/Decline quick-reply
  buttons), `payment_link`, `booking_confirmation`, `hold_expired`. Copy goes in
  `docs/whatsapp-booking/templates.md` (create it) so approvals are tracked.
- Interactive reply buttons for approvals: button ids encode
  `approve:<bookingId>` / `decline:<bookingId>`; validate sender is an
  allow-listed approver.
- Send media (invoice PDF) via document message (upload media first or link).
- Respect opt-in/opt-out: if a guest says STOP, stop messaging.
- Local testing: use Meta's test number + a tunnel (ngrok/cloudflared) for the
  webhook.

## iCal feeds

**Import (read availability)**

- Airbnb: Calendar → Availability → Connect calendars → *Export calendar*.
- Booking.com: Extranet → Rates & Availability → Sync calendars → *Export*.
- LekkeSlaap: check whether it offers iCal export; add as a third source if so.
- Store URLs in `calendar_sources` (they are secret-ish; treat as secrets).
- Parse with `node-ical`. Events are all-day, DTEND exclusive. Airbnb includes
  "Reserved" and "Airbnb (Not available)" events — both block. Timezone:
  Africa/Johannesburg (UTC+2, no DST).
- Replace a source's `external_blocks` in one transaction per sync. If fetch or
  parse fails, keep old data but mark the source `stale`; availability
  fails closed after a configurable staleness (default 30 min).
- Poll every 5–10 min via Vercel Cron (Pro plan).

**Export (block our dates on platforms)**

- Publish `/api/ical/direct.ics?token=…` (see architecture). Owner pastes it
  into: Airbnb → *Import calendar*; Booking.com → *Import calendar*; LekkeSlaap
  if supported.
- Platforms poll slowly. This is the source of the double-booking window.
- Always include holds as blocked.

## Yoco

- Checkout API (existing code: `src/app/api/yoco/checkout/route.ts`, currently
  disabled by `DIRECT_BOOKINGS_ENABLED=false`): create a checkout with amount in
  **cents**, currency ZAR, success/cancel/failure URLs and `metadata`
  (booking id/ref). Send the returned `redirectUrl` to the guest.
- Env: `YOCO_SECRET_KEY` (live; **the old one leaked — rotate**),
  `YOCO_WEBHOOK_SECRET`.
- **Webhook:** register `/api/yoco/webhook` in the Yoco portal; verify the
  signature; on `payment.succeeded` mark paid **idempotently** (unique
  `yoco_payment_id`); ignore duplicates; handle late payments for expired holds
  (re-check availability; if taken, auto-flag for refund and alert admin).
- Link expiry: create checkout only after approval; keep `hold_expires_at`
  consistent with it.
- Use test keys in preview/dev. Never log full payloads containing card data
  (Yoco does not send card numbers, but log minimally anyway).

## Resend (existing)

Used for contact form and for the emailed invoice. Env: `RESEND_API_KEY`,
`RESEND_FROM_EMAIL`. The domain must be verified (SPF/DKIM).

## Environment variables (target)

Add to `.env.example` as they are introduced:

```
OPENROUTER_API_KEY=
OPENROUTER_MODEL=
OPENROUTER_FALLBACK_MODEL=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_APP_SECRET=
WHATSAPP_VERIFY_TOKEN=
WHATSAPP_APPROVER_NUMBERS=
YOCO_SECRET_KEY=
YOCO_WEBHOOK_SECRET=
DATABASE_URL=
CRON_SECRET=
ICAL_FEED_TOKEN=
AUTH_SECRET=
ADMIN_EMAILS=
```
