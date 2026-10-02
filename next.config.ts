import type { NextConfig } from "next";

// Temporarily disabled: direct bookings are not live yet. Guests are routed to
// Airbnb / Booking.com / LekkeSlaap instead. The booking, tracking and timeline
// pages remain in the codebase but are unreachable. Remove these redirects to
// re-enable direct bookings.
const DIRECT_BOOKING_ROUTES = ["/book", "/track", "/timeline"];

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF/WebP at the size each viewport needs. The photos are most of
    // what this site is, so this is the single biggest page-weight saving.
    formats: ["image/avif", "image/webp"],
  },
  trailingSlash: true,

  redirects: async () =>
    DIRECT_BOOKING_ROUTES.map((source) => ({
      source: `${source}/:path*`,
      destination: "/",
      permanent: false,
    })),

  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ],
    },
  ],
};

export default nextConfig;
