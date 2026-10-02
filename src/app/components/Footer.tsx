import Link from 'next/link';
import { propertyDetails, livePlatforms, formatPhone, whatsappLink } from '@/lib/property';
import { guestDocs, legalDocs } from '@/lib/docs';

const quickLinks = [
  { href: '/#about', label: 'The Space' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];


export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { contact, location, name } = propertyDetails;

  return (
    <footer className="on-dark bg-stone-950 text-white pt-16 pb-10 border-t border-white/10">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 mb-12">
          <div className="lg:col-span-2 max-w-sm">
            <h3 className="font-display text-2xl">{name}</h3>
            <p className="text-stone-400 text-sm mt-2 leading-relaxed">
              A boutique guesthouse in {location.neighborhood},{' '}
              {location.city} — thoughtfully designed for couples, business
              travellers and solo adventurers.
            </p>
            <Link href="/#booking-platforms" className="btn-primary mt-6 !bg-white !text-stone-900 hover:!bg-stone-200">
              Book Your Stay
            </Link>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-stone-500 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-stone-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-stone-500 mb-4">
              Guest Info
            </h4>
            <ul className="space-y-2.5 text-sm">
              {guestDocs.map((doc) => (
                <li key={doc.href}>
                  <Link
                    href={doc.href}
                    className="text-stone-400 hover:text-white transition-colors"
                  >
                    {doc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-stone-500 mb-4">
              Book On
            </h4>
            <ul className="space-y-2.5 text-sm mb-6">
              {livePlatforms.map((platform) => (
                <li key={platform.id}>
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="platform_click"
                    data-platform={platform.id}
                    data-section="footer"
                    className="text-stone-400 hover:text-white transition-colors"
                  >
                    {platform.name}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-xs uppercase tracking-widest text-stone-500 mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={whatsappLink(contact.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp_click"
                  data-section="footer"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  {formatPhone(contact.whatsapp)}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  data-track="email_click"
                  data-section="footer"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  {/* Let a long address wrap at the @, not mid-word. */}
                  {contact.email.split('@')[0]}
                  <wbr />@{contact.email.split('@')[1]}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-stone-500">
          <p>
            © {currentYear} {name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalDocs.map((doc) => (
              <li key={doc.href}>
                <Link href={doc.href} className="hover:text-white transition-colors">
                  {doc.label}
                </Link>
              </li>
            ))}
            <li>{location.neighborhood}, {location.city}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
