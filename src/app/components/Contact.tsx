'use client';

import Reveal from './Reveal';
import { propertyDetails, livePlatforms, formatPhone, whatsappLink } from '@/lib/property';
import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { platformIcons } from './icons/PlatformIcons';
import { guestDocs } from '@/lib/docs';

export default function Contact() {
  const { contact, location } = propertyDetails;

  return (
    <section id="contact" className="on-dark py-20 lg:py-28 bg-stone-900 text-white scroll-mt-24">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <Reveal>
            <span className="eyebrow mb-4 !text-stone-400">Get in Touch</span>
            <h2 className="font-display text-4xl lg:text-5xl mb-6">
              We&apos;d Love to Hear From You
            </h2>
            <p className="text-lg text-stone-400 mb-10 leading-relaxed max-w-md">
              Have questions about your stay? Need local recommendations?
              We&apos;re here to make your visit to Johannesburg unforgettable.
            </p>

            <div className="space-y-3">
              <a
                href={whatsappLink(contact.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-section="contact"
                className="group flex items-center gap-4 p-4 -mx-4 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="w-[3.25rem] h-[3.25rem] shrink-0 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-stone-500">
                    WhatsApp
                  </p>
                  <p className="text-lg truncate">{formatPhone(contact.whatsapp)}</p>
                </div>
              </a>

              <a
                href={`mailto:${contact.email}`}
                data-track="email_click"
                data-section="contact"
                className="group flex items-center gap-4 p-4 -mx-4 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="w-[3.25rem] h-[3.25rem] shrink-0 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-stone-900 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-stone-500">
                    Email
                  </p>
                  <p className="text-lg truncate">{contact.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 -mx-4">
                <div className="w-[3.25rem] h-[3.25rem] shrink-0 bg-white/10 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-stone-500">
                    Location
                  </p>
                  <p className="text-lg">{location.address}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Booking platforms and guest documents */}
          <Reveal delay={120} className="lg:pl-16 lg:border-l lg:border-white/10">
            <h3 className="font-display text-2xl mb-8">Ready to Book?</h3>

            <div className="space-y-3 mb-12">
              {livePlatforms.map((platform) => {
                const mark = platformIcons[platform.id];
                return (
                  <a
                    key={platform.id}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="platform_click"
                    data-platform={platform.id}
                    data-section="contact"
                    className="group flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white hover:text-stone-900 transition-colors"
                  >
                    <span className="flex items-center gap-4 min-w-0">
                      <span className="w-10 h-10 shrink-0 rounded-xl bg-white/10 group-hover:bg-stone-900 group-hover:text-white flex items-center justify-center transition-colors">
                        {mark && <mark.Icon className={mark.compact} />}
                      </span>
                      <span className="font-medium truncate">
                        {platform.name}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 text-stone-500 group-hover:text-stone-900 transition-colors" aria-hidden />
                  </a>
                );
              })}
            </div>

            <div className="border-t border-white/10 pt-8">
              <p className="text-xs uppercase tracking-widest text-stone-500 mb-4">
                Before you book
              </p>
              <ul className="flex flex-wrap gap-2.5">
                {guestDocs.map((doc) => (
                  <li key={doc.href}>
                    <Link
                      href={doc.href}
                      className="inline-flex px-4 py-2 rounded-full ring-1 ring-white/15 text-sm font-medium text-stone-300 hover:bg-white hover:text-stone-900 hover:ring-white transition-colors"
                    >
                      {doc.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
