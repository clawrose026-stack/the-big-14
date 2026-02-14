'use client';

import { propertyDetails } from '@/lib/property';
import { Phone, Mail, MapPin, Instagram, Facebook, ExternalLink, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-20 bg-charcoal text-white relative overflow-hidden">
      {/* Fun background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-coral/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-sage/10 rounded-full blur-3xl" />
      
      <div className="section-padding max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Let&apos;s Chat 💬
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Got Questions?
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            We&apos;re here to help! Whether you need local tips or have special requests, just reach out.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* WhatsApp Card */}
          <a href={`https://wa.me/27${propertyDetails.contact.whatsapp.slice(1)}`} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-green-500/20 p-8 rounded-3xl transition-all group">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">WhatsApp Us</h3>
            <p className="text-white/70 mb-4">Fastest response!</p>
            <p className="font-semibold">+27 {propertyDetails.contact.whatsapp}</p>
          </a>

          {/* Email Card */}
          <a href={`mailto:${propertyDetails.contact.email}`} className="bg-white/10 hover:bg-coral/20 p-8 rounded-3xl transition-all group">
            <div className="w-16 h-16 bg-coral rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">Send an Email</h3>
            <p className="text-white/70 mb-4">For detailed inquiries</p>
            <p className="font-semibold text-sm">{propertyDetails.contact.email}</p>
          </a>

          {/* Location Card */}
          <div className="bg-white/10 p-8 rounded-3xl">
            <div className="w-16 h-16 bg-sky rounded-2xl flex items-center justify-center mb-6">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">Find Us</h3>
            <p className="text-white/70 mb-4">Randburg, Johannesburg</p>
            <p className="font-semibold">South Africa 📍</p>
          </div>
        </div>

        {/* Social & Platforms */}
        <div className="bg-white/5 p-8 rounded-3xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-4">
              <a href="#" className="w-14 h-14 bg-white/10 hover:bg-pink-500 rounded-2xl flex items-center justify-center transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="w-14 h-14 bg-white/10 hover:bg-blue-600 rounded-2xl flex items-center justify-center transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <span className="text-white/50">Also on:</span>
              <a href="https://www.airbnb.com/rooms/1591430106686520580" target="_blank" rel="noopener noreferrer" className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors flex items-center gap-2">
                Airbnb <ExternalLink className="w-4 h-4" />
              </a>
              <a href="https://www.booking.com/hotel/za/big-14-guesthouse-randburg-johannesburg.html" target="_blank" rel="noopener noreferrer" className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors flex items-center gap-2">
                Booking.com <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
