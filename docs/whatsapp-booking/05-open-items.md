# 05 — Open Items, Decisions and Risks

## Needed from the owner

### WhatsApp (start first — longest lead time)
- Meta Business account with **business verification** (days–weeks).
- A phone number not active on the normal WhatsApp app (new SIM, or migrate the
  existing one — it then stops working in the app).
- Approved display name (e.g. "The Big 14").
- Approver numbers (E.164). Approvers need templates or must message the bot
  first.

### Calendars
- Airbnb iCal **export** URL.
- Booking.com iCal **export** URL.
- LekkeSlaap: confirm whether iCal is offered.
- Later: paste our published feed URL into each platform's import screen.

### Payments
- New **live** Yoco secret key (old one leaked) + webhook secret.

### AI
- OpenRouter account, API key, and a monthly spend cap.
- Decision on model (see 03-integrations.md). Ask the user which price/quality
  tier they want.

### Invoices / legal
- Legal business name, registration number, VAT number (if registered),
  invoice address, invoice number format (proposed `TB14-2026-0001`).

### Infrastructure
- Managed Postgres (Neon via Vercel Marketplace recommended).
- **Vercel Pro** (cron every few minutes).
- Dashboard login emails.

### Business rules to decide
- Direct nightly rate (site says R730; LekkeSlaap shows from R968), weekend and
  seasonal pricing, cleaning fee.
- Min/max nights, how far ahead guests may book.
- Full payment vs deposit.
- Cancellation/refund policy for direct bookings.
- Collect ID/passport? (Adds POPIA duties; default: no.)
- Approval rules: timeout, one vs multiple approvals, guest message on timeout.
- Payment link expiry (proposed 30–60 min).
- Commission % per platform (for the "fees saved" stat).

## Known risks

1. **Double booking** — iCal sync lag. Mitigations in 01-overview.md.
   Cannot be fully eliminated without platform APIs.
2. **Airbnb terms** — moving guests met on Airbnb off-platform is prohibited.
3. **WhatsApp policy** — 24h window, template approval, business verification;
   bot messaging must be opt-in and respect opt-out.
4. **AI errors** — wrong price/date. Mitigated by tool-only facts, date echo
   confirmation, human approval before payment, and evals.
5. **Prompt injection** — guest messages are untrusted input; tools enforce
   rules.
6. **Cost** — model usage and WhatsApp conversation fees; add caps and
   dashboards.
7. **POPIA** — new processors (Meta, OpenRouter, Yoco); update privacy policy.
8. **Secrets** — previous leak below.

## Security debt from earlier work (do not forget)

Live credentials were committed in git history: `env_pulled.txt` (Postgres
password, Yoco secret key, Vercel OIDC token) and hard-coded Postgres creds in
an older `src/lib/db.ts`. They were removed from tracking but **remain in
history and must be rotated**, then history purged (`git filter-repo`) and a
secret-scanning guard added. The old Jira tickets BIG-2 and BIG-3 on
algori.atlassian.net describe this. Until rotated, assume compromised.

## Other earlier backlog still open

Resend domain verification (SPF/DKIM), Vercel env vars + domain (HTTPS),
rate limiting for `/api/contact`, error monitoring/uptime, mobile/a11y pass,
legal text review by a qualified person, confirming public-site claims
(price, ratings), merging `link-to-platforms` to `master`.
