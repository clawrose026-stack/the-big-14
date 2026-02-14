'use client';

import { propertyDetails } from '@/lib/property';
import { Star, MapPin, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-stone-100">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/70 via-stone-900/40 to-transparent z-10" />
        <div className="w-full h-full bg-stone-300">
          {/* Placeholder for hero image */}
          <div className="w-full h-full flex items-center justify-center bg-stone-200">
            <span className="text-stone-500 text-lg">Hero Image: Exterior/Main Entrance</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col justify-end pb-16 lg:pb-24 section-padding">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="text-sm font-medium text-stone-900">5.0</span>
              <span className="text-sm text-stone-600">Guest Rating</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5">
              <span className="text-sm font-medium text-stone-900">Superhost</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white mb-6 leading-[0.9] tracking-tight">
            {propertyDetails.name}
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-8 font-light max-w-xl">
            {propertyDetails.tagline}
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 text-white/80 mb-12">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">{propertyDetails.location.address}</span>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <a href="#book" className="btn-primary text-lg">
              Check Availability
            </a>
            <a href="#about" className="btn-outline bg-white/10 border-white text-white hover:bg-white hover:text-stone-900 text-lg">
              Explore Property
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
}
