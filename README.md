# The Big 14 - Direct Booking Website

A premium direct booking website for The Big 14 guesthouse in Randburg, Johannesburg.

## Features

- **Direct Bookings** - No platform fees, own your customer relationships
- **Interactive Calendar** - Real-time availability with visual booking interface
- **Supabase Integration** - All bookings stored securely in PostgreSQL
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Premium UX** - Bold, editorial design that converts visitors to bookings

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- date-fns (Calendar)
- Lucide React (Icons)

## Setup

### 1. Supabase Configuration

1. Go to your Supabase project: https://ojampranqzwvnstwanlc.supabase.co
2. Open the SQL Editor
3. Run the schema from `supabase-schema.sql`

### 2. Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://ojampranqzwvnstwanlc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_8qbws1j4O590wrRHQNPCgg_Wh_Qi-lm
```

### 3. Development

```bash
npm install
npm run dev
```

### 4. Build & Deploy

```bash
npm run build
```

Deploy the `dist` folder to Vercel.

## Property Details

- **Name:** The Big 14
- **Location:** Randburg, Johannesburg, South Africa
- **Type:** Guesthouse
- **Capacity:** 1 bedroom, 1 bathroom, up to 2 guests
- **Rating:** 5.0★

## Contact

- WhatsApp: +27 63 900 1897
- Email: thebigfourteen03@gmail.com

## Roadmap

- [ ] iCal sync with Airbnb/Booking.com
- [ ] PayFast payment integration
- [ ] Admin dashboard for managing bookings
- [ ] Email notifications for new bookings
- [ ] Google Calendar integration
