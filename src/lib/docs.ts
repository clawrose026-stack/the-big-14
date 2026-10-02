/**
 * The guest-facing document set. The footer, the contact section, the
 * sitemap and each document's "More information" navigation all read from
 * this list, so a new page only has to be added here.
 */
export type DocLink = {
  href: string;
  label: string;
  /** Guest information, or legal small print. */
  group: 'guest' | 'legal';
};

export const docPages: DocLink[] = [
  { href: '/house-rules', label: 'House Rules', group: 'guest' },
  { href: '/faq', label: 'FAQ', group: 'guest' },
  { href: '/cancellation-policy', label: 'Cancellation Policy', group: 'guest' },
  { href: '/safety', label: 'Safety & Security', group: 'guest' },
  { href: '/accessibility', label: 'Accessibility', group: 'guest' },
  { href: '/terms', label: 'Terms of Use', group: 'legal' },
  { href: '/privacy', label: 'Privacy Policy', group: 'legal' },
];

export const guestDocs = docPages.filter((d) => d.group === 'guest');
export const legalDocs = docPages.filter((d) => d.group === 'legal');
