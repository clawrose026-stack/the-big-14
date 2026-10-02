'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

/**
 * One listener for the whole site: any link carrying `data-track` reports a
 * click as a Vercel Analytics custom event. This keeps the booking section,
 * footer and contact section as server components — they only need to add
 * the attributes, not become client code themselves.
 *
 *   data-track="platform_click" data-platform="airbnb" data-section="footer"
 */
export default function ClickTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLElement>(
        '[data-track]'
      );
      if (!link) return;

      const { track: name, platform, section } = link.dataset;
      if (!name) return;

      track(name, {
        ...(platform && { platform }),
        ...(section && { section }),
        page: window.location.pathname,
      });
    };

    // Capture phase, so the event is recorded before a new tab opens.
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
