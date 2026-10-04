# Agent guide

- Public site: see [README.md](README.md).
- **WhatsApp booking system (in progress):** start at
  [docs/whatsapp-booking/README.md](docs/whatsapp-booking/README.md). Task list
  is `04-tasks.md`; current state is `06-status.md` — update it when you finish.
- All AI calls go through OpenRouter. Never commit secrets. Property facts live
  in `src/lib/property.ts`.
- Verify with `npm run lint`, `npx tsc --noEmit`, `npm run build`.
