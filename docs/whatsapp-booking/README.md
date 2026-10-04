# WhatsApp Booking System — Handover Index

**Read this first.** These docs let any engineer or AI agent pick up the work
without the original conversation.

| File | Read it for |
| --- | --- |
| [01-overview.md](01-overview.md) | What we are building, why, and the flow end to end |
| [02-architecture.md](02-architecture.md) | Components, data model, API routes, state machines, tech choices |
| [03-integrations.md](03-integrations.md) | WhatsApp Cloud API, OpenRouter, iCal, Yoco — specifics and gotchas |
| [04-tasks.md](04-tasks.md) | **The work breakdown, in build order, with acceptance criteria** |
| [05-open-items.md](05-open-items.md) | What we need from the owner, decisions pending, known risks |
| [06-status.md](06-status.md) | **What is done and what is not. Keep this current.** |

## 30-second summary

Guests message The Big 14 on WhatsApp. An AI assistant (via **OpenRouter**)
chats with them, checks availability against the Airbnb and Booking.com **iCal
feeds**, and collects booking details. A human approver approves on WhatsApp.
A **Yoco** payment link is sent; on payment the guest gets an invoice and the
dates are blocked on the other platforms through **our own published iCal
feed**. A web dashboard manages everything.

Goal: take direct bookings with **no platform booking fees**.

## Rules for whoever continues this work

1. **Update [06-status.md](06-status.md)** at the end of every session: what you
   finished, what you started, what is blocked.
2. **All AI calls go through OpenRouter.** Do not add the Anthropic or OpenAI
   SDKs directly. See [03-integrations.md](03-integrations.md).
3. **Never commit secrets.** Real keys live only in Vercel env vars. A previous
   leak (see [05-open-items.md](05-open-items.md)) is why this matters.
4. **The model never decides money or availability.** Prices, availability and
   booking state come from code and the database, never from model output.
5. Branch: `whatsapp-booking` (branched from `link-to-platforms`).
6. Verify before claiming done: `npm run lint`, `npx tsc --noEmit`,
   `npm run build`.

## Repo context

Next.js 16 (App Router), React 19, Tailwind v4, deployed on Vercel. The public
marketing site already exists (house rules, FAQ, policies, platform links). See
the root [README.md](../../README.md). Property facts live in
[src/lib/property.ts](../../src/lib/property.ts) — single source of truth.
