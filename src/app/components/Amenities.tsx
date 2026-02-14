'use client';

import { propertyDetails } from '@/lib/property';
import { Wifi, Car, Snowflake, Tv, Coffee, Droplets, Shield, Moon } from 'lucide-react';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Wifi,
  Car,
  Snowflake,
  Tv,
  Coffee,
  Droplet: Droplets,
  Shield,
  Moon,
};

export default function Amenities() {
  return (
    <section className="py-24 bg-white">
      <div className="section-padding max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-stone-500 text-sm tracking-widest uppercase mb-4 block">
              Amenities
            </span>
            <h2 className="font-display text-4xl lg:text-5xl text-stone-900 mb-6">
              Everything You Need for a Perfect Stay
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              We&apos;ve thought of every detail so you don&apos;t have to. From high-speed WiFi 
              to premium linens, The Big 14 offers all the comforts of home with the 
              luxury of a boutique retreat.
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="grid grid-cols-2 gap-6">
            {propertyDetails.amenities.map((amenity, index) => {
              const IconComponent = iconMap[amenity.icon] || Shield;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-stone-50 hover:bg-stone-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-stone-900 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-stone-900">{amenity.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-20 pt-16 border-t border-stone-200">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {propertyDetails.highlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <div className="w-3 h-3 bg-stone-900 mx-auto mb-3" />
                <span className="text-sm font-medium text-stone-900">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
