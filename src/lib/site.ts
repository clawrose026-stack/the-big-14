/**
 * The site's canonical origin. Set NEXT_PUBLIC_SITE_URL in Vercel for both
 * production and preview; VERCEL_URL is the per-deployment fallback.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '');

/** True only on the production deployment — used to gate indexing. */
export const isProduction = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === 'production'
  : process.env.NODE_ENV === 'production';
