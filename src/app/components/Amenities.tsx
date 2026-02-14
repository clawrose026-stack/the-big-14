'use client';

import { propertyDetails } from '@/lib/property';
import { Wifi, Car, Snowflake, Tv, Coffee, Droplets, Shield, Moon, Heart } from 'lucide-react';

const amenities = [
  { icon: Wifi, label: "Fast WiFi", color: "bg-sky/20 text-sky" },
  { icon: Car, label: "Free Parking", color: "bg-sunshine/30 text-amber-600" },
  { icon: Snowflake, label: "Air Conditioning", color: "bg-sky/20 text-sky" },
  { icon: Tv, label: "Smart TV", color: "bg-lavender/30 text-purple-600" },
  { icon: Coffee, label: "Coffee Station", color: "bg-orange-100 text-orange-600" },
  { icon: Droplets, label: "Hot Water", color: "bg-blue-100 text-blue-600" },
  { icon: Shield, label: "Secure Stay", color: "bg-green-100 text-green-600" },
  { icon: Moon, label: "Premium Linens", color: "bg-indigo-100 text-indigo-600" },
];

export default function Amenities() {
  return (
    <section className="py-20 bg-white">
      <div className="section-padding max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-coral-light text-coral px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Everything You Need 🎯
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Amenities & Perks
          </h2>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            We&apos;ve thought of all the little things so you can just relax and enjoy your stay!
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="group text-center p-6 rounded-3xl bg-cream hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-16 h-16 ${amenity.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <amenity.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-charcoal">{amenity.label}</h3>
            </div>
          ))}
        </div>

        {/* Love note */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-sage-light text-sage px-6 py-3 rounded-full">
            <Heart className="w-5 h-5 fill-current" />
            <span className="font-medium">Loved by 50+ guests!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
