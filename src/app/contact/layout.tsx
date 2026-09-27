import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with The Big 14 guesthouse in Randburg, Johannesburg — WhatsApp, email, or send us a message.',
  alternates: { canonical: '/contact/' },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
