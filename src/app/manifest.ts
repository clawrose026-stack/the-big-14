import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Big 14 — Guesthouse, Randburg',
    short_name: 'The Big 14',
    description: 'A boutique guesthouse in Randburg, Johannesburg.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1c1917',
    icons: [
      { src: '/icon/', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon/', sizes: '180x180', type: 'image/png' },
    ],
  };
}
