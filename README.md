# The Big 14

Marketing site for The Big 14, a boutique guesthouse in Randburg, Johannesburg.

Guests currently book through external platforms (Airbnb, Booking.com,
LekkeSlaap). The direct-booking flow is built but **switched off** — see
[Direct bookings](#direct-bookings) below.

## Tech stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- Postgres via `pg` (direct booking flow only)
- Resend (transactional email)
- Deployed on Vercel

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Environment variables

Create `.env.local` locally, and set the same keys in the Vercel project
settings for **Production**, **Preview** and **Development**. Never commit
real values.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | Canonical origin, e.g. `https://thebig14.co.za`. Drives canonical URLs, OG tags, `sitemap.xml` and JSON-LD. |
| `RESEND_API_KEY` | Yes | Sends the contact-form email. |
| `RESEND_FROM_EMAIL` | Yes | Verified Resend sender, e.g. `bookings@thebig14.co.za`. |
| `CONTACT_INBOX` | No | Where contact-form enquiries land. Defaults to the address in `src/lib/property.ts`. |
| `PG_HOST`, `PG_PORT`, `PG_DATABASE`, `PG_USER`, `PG_PASSWORD` | Direct bookings only | Postgres connection. `DATABASE_URL` may be used instead. |
| `YOCO_SECRET_KEY` | Direct bookings only | Yoco checkout. |

## Where things live

| Path | What it is |
| --- | --- |
| `src/lib/property.ts` | Property facts, contact details and the **booking platform links**. Edit the links here — the booking section, footer and contact section all read from this one list. |
| `src/lib/site.ts` | Canonical origin and the production/preview check used to gate indexing. |
| `src/app/components/StructuredData.tsx` | `LodgingBusiness` JSON-LD for search engines. |
| `src/app/sitemap.ts`, `src/app/robots.ts` | SEO routes. Preview deployments are set to `noindex`. |
| `src/app/api/contact/route.ts` | Contact form handler (validation, honeypot, Resend). |

### Adding or changing a booking platform

Edit `bookingPlatforms` in `src/lib/property.ts`. Set `url` to `null` to hide a
platform until its listing is live. For a new platform, also add an icon under
the matching `id` in `src/app/components/BookingPlatforms.tsx`.

## Direct bookings

The booking, tracking and timeline pages still exist but are unreachable. Three
switches turn them back on:

1. `next.config.ts` — remove the entries from `DIRECT_BOOKING_ROUTES`.
2. `src/app/api/bookings/route.ts` — set `DIRECT_BOOKINGS_ENABLED = true`.
3. `src/app/api/yoco/checkout/route.ts` — set `DIRECT_BOOKINGS_ENABLED = true`.

Before re-enabling, the database schema in `schema.sql` must be applied and the
`PG_*` and `YOCO_SECRET_KEY` variables set.

## Deployment

Pushes to `master` deploy to production on Vercel; every other branch gets a
preview deployment, which is served `noindex` automatically.

```bash
npm run build   # verify locally before pushing
```

## Property details

- **Location:** Randburg, Johannesburg, South Africa
- **Type:** Guesthouse — 1 bedroom, 1 bathroom, up to 2 guests
- **WhatsApp:** +27 63 900 1897
- **Email:** thebigfourteen03@gmail.com
