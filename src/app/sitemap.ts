import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';
import { docPages } from '@/lib/docs';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/about/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    ...docPages.map((doc) => ({
      url: `${siteUrl}${doc.href}/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: doc.group === 'guest' ? 0.6 : 0.3,
    })),
  ];
}
