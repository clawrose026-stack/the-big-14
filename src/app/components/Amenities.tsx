'use client';

import Reveal from './Reveal';
import { propertyDetails } from '@/lib/property';
import {
  Wifi,
  Zap,
  Car,
  Snowflake,
  Tv,
  CookingPot,
  Flame,
  Trees,
  WashingMachine,
  Laptop,
  Moon,
  Shield,
  Check,
} from 'lucide-react';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Wifi,
  Zap,
  Car,
  Snowflake,
  Tv,
  CookingPot,
  Flame,
  Trees,
  WashingMachine,
  Laptop,
  Moon,
  Shield,
};

export default function Amenities() {
  return (
    <section className="py-20 lg:py-28 bg-stone-50">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:sticky lg:top-28">
            <span className="eyebrow mb-4">Amenities</span>
            <h2 className="font-display text-4xl lg:text-5xl text-stone-900 mb-6">
              Everything You Need for a Perfect Stay
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              We&apos;ve thought of every detail so you don&apos;t have to. From
              high-speed WiFi to premium linens, The Big 14 offers all the
              comforts of home with the luxury of a boutique retreat.
            </p>
          </Reveal>

          {/* Amenities Grid */}
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {propertyDetails.amenities.map((amenity, index) => {
              const IconComponent = iconMap[amenity.icon] || Shield;
              return (
                <Reveal key={amenity.label} delay={index * 50}>
                  <div className="group h-full flex items-center gap-4 p-4 bg-white rounded-2xl ring-1 ring-stone-900/5 hover:ring-stone-900/15 hover:shadow-[0_16px_32px_-24px_rgba(28,25,23,0.6)] transition-all duration-300">
                    <div className="w-11 h-11 bg-stone-900 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                      <IconComponent className="w-5 h-5 text-white" aria-hidden />
                    </div>
                    <span className="font-medium text-stone-900 text-[0.9375rem]">
                      {amenity.label}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Highlights */}
        <Reveal className="mt-16 lg:mt-24 pt-12 border-t border-stone-200">
          <ul className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {propertyDetails.highlights.map((highlight) => (
              <li
                key={highlight}
                className="inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-full ring-1 ring-stone-900/5 text-sm font-medium text-stone-900"
              >
                <Check className="w-4 h-4 text-stone-400 shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
