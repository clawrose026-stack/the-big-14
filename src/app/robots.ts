import type { MetadataRoute } from 'next';
import { siteUrl, isProduction } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  // Preview deployments must never be indexed — they would compete with
  // the production site for the same content.
  if (!isProduction) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/track/', '/timeline/'] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
