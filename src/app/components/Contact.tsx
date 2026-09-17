'use client';

import Reveal from './Reveal';
import { propertyDetails, formatPhone, whatsappLink } from '@/lib/property';
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  ArrowUpRight,
} from 'lucide-react';

export default function Contact() {
  const { contact, location } = propertyDetails;
  const socials = [
    { href: contact.instagram, icon: Instagram, label: 'Follow on Instagram' },
    { href: contact.facebook, icon: Facebook, label: 'Like on Facebook' },
  ].filter((s) => s.href && s.href !== '#');

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

          {/* Quick Links / Social */}
          <Reveal delay={120} className="lg:pl-16 lg:border-l lg:border-white/10">
            <h3 className="font-display text-2xl mb-8">Connect With Us</h3>

            {socials.length > 0 && (
              <div className="space-y-3 mb-12">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Icon className="w-5 h-5" />
                      <span>{label}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            )}

            {/* Platform Links */}
            <div className={socials.length > 0 ? 'border-t border-white/10 pt-8' : ''}>
              <p className="text-xs uppercase tracking-widest text-stone-500 mb-4">
                Also available on
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.airbnb.com/rooms/1591430106686520580"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white hover:text-stone-900 text-sm font-medium transition-colors"
                >
                  Airbnb
                </a>
                <a
                  href="https://www.booking.com/hotel/za/big-14-guesthouse-randburg-johannesburg.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white hover:text-stone-900 text-sm font-medium transition-colors"
                >
                  Booking.com
                </a>
                <a
                  href="https://www.lekkeslaap.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white hover:text-stone-900 text-sm font-medium transition-colors"
                >
                  Lekkeslaap
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
