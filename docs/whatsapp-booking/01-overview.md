# 01 — Overview

## Goal

Let guests book The Big 14 directly through WhatsApp so bookings avoid the
commission and fees charged by Airbnb, Booking.com and LekkeSlaap, while still
using those platforms' calendars so the property is never double-booked.

## The flow

1. **Chat.** A guest messages the property's WhatsApp number. An AI assistant
   answers questions (from the FAQ, house rules, amenities) and asks for dates,
   number of guests and name.
2. **Availability.** The system checks the requested dates against: the Airbnb
   iCal feed, the Booking.com iCal feed, our own direct bookings, and manual
   blocks.
3. **Quote and hold.** If free, the system quotes the price (computed by code)
   and places a short **hold** on the dates.
4. **Approval.** A WhatsApp message with **Approve / Decline** buttons goes to
   the approver number(s).
5. **Payment link.** On approval, availability is re-checked, a **Yoco**
   checkout link is created, and the guest receives it on WhatsApp. The link
   expires.
6. **Payment.** Yoco's webhook confirms payment. The booking becomes
   `confirmed`.
7. **Invoice.** The guest receives an invoice (PDF) with the booking reference
   by WhatsApp and email.
8. **Calendar block.** Our published iCal feed now includes the booking, so
   Airbnb and Booking.com block those dates.
9. **Dashboard.** Staff see everything in a web app with stats.

## Critical correction to the original idea

**iCal cannot create bookings on Airbnb or Booking.com.** iCal is read-only
sync between calendars. The correct mechanism:

- We **import** their feeds to read what is taken (step 2).
- We **publish** our own feed; the owner adds that URL once to both platforms'
  "import calendar" screens. They then block our dates automatically.

### Consequences to design for

- Platforms poll imported feeds every ~2–24 hours. A window exists where
  another platform could sell dates we just sold. Mitigations (all required):
  hold dates immediately, re-check availability right before sending the payment
  link and again on payment, expire payment links in 30–60 min, include pending
  holds in our published feed.
- If a conflict still happens, an admin must resolve it manually. The dashboard
  must surface conflicts (see tasks).
- Airbnb's terms forbid moving guests *met on Airbnb* to off-platform bookings.
  The bot is for guests who contact us directly.

## Scope

**In:** WhatsApp bot, availability sync, approval flow, Yoco payment, invoices,
published iCal feed, admin dashboard + stats, updates to public policy pages.

**Out (for now):** Official Airbnb/Booking.com APIs (not available to single
hosts), multi-property support, languages other than English (Afrikaans is a
possible later addition), refunds automation beyond a manual admin action.

## Property constants

One unit, 2 guests max, check-in 14:00–20:00, check-out 10:00. Source:
`src/lib/property.ts`. Nightly rate on the public site is R730 but the owner
must confirm the direct rate (see open items).
