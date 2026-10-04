# 06 — Status (keep current)

_Last updated: 2026-10-04_

## Branches

- `link-to-platforms` — public marketing site polish. **Pushed** to `origin`
  (GitHub). Not yet merged to `master`.
- `whatsapp-booking` — this work. Branched from `link-to-platforms`. So far
  contains **documentation only**.

## Done

- Public site: platform links with real monochrome logos, house rules, FAQ,
  cancellation policy, safety, accessibility, terms, privacy, analytics,
  icons/manifest, CI workflow, link checker.
- Facts on the site corrected against live Airbnb, Booking.com and LekkeSlaap
  listings.
- Old direct-booking API routes disabled.
- This handover documentation.

## Not started

Everything in 04-tasks.md. No WhatsApp, OpenRouter, iCal, Yoco-webhook,
invoice or dashboard code exists yet.

## Blocked on owner

See 05-open-items.md. Nothing in Phases 1–5 is blocked except needing a
database URL and the iCal URLs to test against real data.

## Next recommended step

Phase 0 → Phase 1: provision Postgres, write migration `001`, build the iCal
importer and `isAvailable()` with tests. Then the dashboard skeleton.

## Decisions log

- 2026-10-04: All AI via **OpenRouter** (owner's requirement).
- 2026-10-04: Direct Meta WhatsApp Cloud API (no BSP) assumed.
- 2026-10-04: iCal is read-only sync; we import platform feeds and publish our
  own feed. Documented in 01-overview.md.
- 2026-10-04: Fresh managed Postgres; do not reuse the leaked EC2 database.
