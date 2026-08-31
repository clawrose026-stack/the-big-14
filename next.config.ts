import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Temporarily disabled: direct bookings are not live yet.
  // Booking pages remain in the codebase but are unreachable.
  // Remove this redirect to re-enable direct bookings.
  redirects: async () => [
    {
      source: "/book/:path*",
      destination: "/",
      permanent: false,
    },
  ],
};

export default nextConfig;
