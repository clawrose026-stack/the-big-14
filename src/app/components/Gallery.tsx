'use client';

import { useState } from 'react';
import { propertyDetails } from '@/lib/property';
import { ChevronLeft, ChevronRight, Bed, Bath, Users, Home } from 'lucide-react';

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    { label: "Exterior View", description: "Main entrance and facade" },
    { label: "Living Area", description: "Spacious living space" },
    { label: "Bedroom", description: "Master bedroom with premium linens" },
    { label: "Bathroom", description: "Modern bathroom" },
    { label: "Kitchen", description: "Fully equipped kitchen" },
    { label: "Outdoor Space", description: "Private outdoor area" },
  ];

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section id="about" className="py-24 bg-stone-50">
      <div className="section-padding max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <span className="text-stone-500 text-sm tracking-widest uppercase mb-4 block">
              The Space
            </span>
            <h2 className="font-display text-4xl lg:text-5xl text-stone-900">
              Where Comfort Meets Style
            </h2>
          </div>
          
          {/* Property Specs */}
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-stone-900 flex items-center justify-center">
                <Bed className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-display text-stone-900">{propertyDetails.specs.bedrooms}</p>
                <p className="text-sm text-stone-500">Bedroom</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-stone-900 flex items-center justify-center">
                <Bath className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-display text-stone-900">{propertyDetails.specs.bathrooms}</p>
                <p className="text-sm text-stone-500">Bathroom</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-stone-900 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-display text-stone-900">{propertyDetails.specs.maxGuests}</p>
                <p className="text-sm text-stone-500">Guests</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-stone-900 flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-display text-stone-900">{propertyDetails.specs.propertyType}</p>
                <p className="text-sm text-stone-500">Type</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Gallery */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Large Featured Image */}
          <div className="lg:col-span-2 lg:row-span-2 relative aspect-[4/3] lg:aspect-auto bg-stone-200 group overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-stone-500">{images[activeImage].label}</span>
            </div>
            
            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-white/90 px-4 py-2">
              <span className="text-sm font-medium">
                {activeImage + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Thumbnail Grid */}
          {images.slice(1, 4).map((image, index) => (
            <div
              key={index}
              onClick={() => setActiveImage(index + 1)}
              className="relative aspect-square bg-stone-200 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-stone-500 text-sm">{image.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mt-16 max-w-3xl">
          <p className="text-lg text-stone-600 leading-relaxed whitespace-pre-line">
            {propertyDetails.description}
          </p>
        </div>
      </div>
    </section>
  );
}
