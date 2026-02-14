'use client';

import { propertyDetails } from '@/lib/property';
import { Phone, Mail, MapPin, Instagram, Facebook, ExternalLink } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-24 bg-stone-900 text-white">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <span className="text-stone-500 text-sm tracking-widest uppercase mb-4 block">
              Get in Touch
            </span>
            <h2 className="font-display text-4xl lg:text-5xl mb-6">
              We&apos;d Love to Hear From You
            </h2>
            <p className="text-lg text-stone-400 mb-12 leading-relaxed">
              Have questions about your stay? Need local recommendations? 
              We&apos;re here to make your visit to Johannesburg unforgettable.
            </p>

            <div className="space-y-6">
              <a
                href={`https://wa.me/27${propertyDetails.contact.whatsapp.slice(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-14 h-14 bg-white/10 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-stone-500">WhatsApp</p>
                  <p className="text-lg">+27 {propertyDetails.contact.whatsapp}</p>
                </div>
              </a>

              <a
                href={`mailto:${propertyDetails.contact.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-14 h-14 bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-stone-900 transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-stone-500">Email</p>
                  <p className="text-lg">{propertyDetails.contact.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-stone-500">Location</p>
                  <p className="text-lg">{propertyDetails.location.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links / Social */}
          <div className="lg:pl-16 lg:border-l lg:border-white/10">
            <h3 className="font-display text-2xl mb-8">Connect With Us</h3>
            
            <div className="space-y-4 mb-12">
              <a
                href={propertyDetails.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Instagram className="w-5 h-5" />
                  <span>Follow on Instagram</span>
                </div>
                <ExternalLink className="w-4 h-4 text-stone-500" />
              </a>
              
              <a
                href={propertyDetails.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Facebook className="w-5 h-5" />
                  <span>Like on Facebook</span>
                </div>
                <ExternalLink className="w-4 h-4 text-stone-500" />
              </a>
            </div>

            {/* Platform Links */}
            <div className="border-t border-white/10 pt-8">
              <p className="text-sm text-stone-500 mb-4">Also available on</p>
              <div className="flex gap-4">
                <a
                  href="https://www.airbnb.com/rooms/1591430106686520580"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-sm transition-colors"
                >
                  Airbnb
                </a>
                <a
                  href="https://www.booking.com/hotel/za/big-14-guesthouse-randburg-johannesburg.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-sm transition-colors"
                >
                  Booking.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
