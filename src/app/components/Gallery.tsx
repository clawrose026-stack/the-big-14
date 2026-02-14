'use client';

import { useState } from 'react';
import { propertyDetails } from '@/lib/property';
import { Bed, Bath, Users, Home, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    { label: "Cozy Bedroom", emoji: "🛏️" },
    { label: "Modern Bathroom", emoji: "🚿" },
    { label: "Living Area", emoji: "🛋️" },
    { label: "Kitchen", emoji: "🍳" },
    { label: "Outdoor Space", emoji: "🌿" },
    { label: "Welcome Area", emoji: "🏠" },
  ];

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section id="about" className="py-20 bg-cream">
      <div className="section-padding max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-sage-light text-sage px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Take a Look Around 👀
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Your Home Away From Home
          </h2>
        </div>

        {/* Property Specs - Fun cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-6 rounded-3xl text-center shadow-sm">
            <div className="w-14 h-14 bg-coral-light rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Bed className="w-6 h-6 text-coral" />
            </div>
            <p className="text-3xl font-bold text-charcoal">{propertyDetails.specs.bedrooms}</p>
            <p className="text-warm-gray">Bedroom</p>
          </div>
          <div className="bg-white p-6 rounded-3xl text-center shadow-sm">
            <div className="w-14 h-14 bg-sky/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Bath className="w-6 h-6 text-sky" />
            </div>
            <p className="text-3xl font-bold text-charcoal">{propertyDetails.specs.bathrooms}</p>
            <p className="text-warm-gray">Bathroom</p>
          </div>
          <div className="bg-white p-6 rounded-3xl text-center shadow-sm">
            <div className="w-14 h-14 bg-sunshine/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-amber-600" />
            </div>
            <p className="text-3xl font-bold text-charcoal">{propertyDetails.specs.maxGuests}</p>
            <p className="text-warm-gray">Guests</p>
          </div>
          <div className="bg-white p-6 rounded-3xl text-center shadow-sm">
            <div className="w-14 h-14 bg-lavender/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Home className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-charcoal">{propertyDetails.specs.propertyType}</p>
            <p className="text-warm-gray">Type</p>
          </div>
        </div>

        {/* Gallery Grid - Fun, rounded */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Main large image */}
          <div className="md:col-span-2 md:row-span-2 relative group">
            <div className="aspect-square md:aspect-auto md:h-full bg-sand rounded-3xl flex items-center justify-center relative overflow-hidden">
              <span className="text-6xl">{images[activeImage].emoji}</span>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full">
                <p className="font-semibold text-charcoal">{images[activeImage].label}</p>
              </div>
            </div>
            
            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnails */}
          {images.slice(1, 4).map((image, index) => (
            <div
              key={index}
              onClick={() => setActiveImage(index + 1)}
              className="aspect-square bg-sand rounded-3xl flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span className="text-4xl">{image.emoji}</span>
            </div>
          ))}
        </div>

        {/* Description - Friendly tone */}
        <div className="mt-12 bg-white p-8 rounded-3xl">
          <p className="text-lg text-warm-gray leading-relaxed">
            Hey there! 👋 Welcome to The Big 14 — your cozy retreat in Randburg! 
            Whether you&apos;re here for work or play, we&apos;ve got you covered. 
            Think of it as your own little sanctuary with all the comforts of home, 
            plus a few extra perks to make your stay special. 
            Fast WiFi for those work calls, comfy bed for lazy mornings, 
            and coffee to fuel your adventures! ☕✨
          </p>
        </div>
      </div>
    </section>
  );
}
