'use client';

import { useState } from 'react';
import Image from 'next/image';
import { propertyDetails } from '@/lib/property';
import { ChevronLeft, ChevronRight, Bed, Bath, Users, Home } from 'lucide-react';

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    { src: '/images/exterior.jpg', label: 'Exterior View', description: 'Main entrance and facade' },
    { src: '/images/patio.jpg', label: 'Outdoor Patio', description: 'Relaxing outdoor space' },
    { src: '/images/patio-2.jpg', label: 'Patio Area', description: 'Private outdoor area' },
    { src: '/images/living-room.jpg', label: 'Living Room', description: 'Spacious living space' },
    { src: '/images/living-room-2.jpg', label: 'Living Area', description: 'Comfortable seating area' },
    { src: '/images/kitchen.jpg', label: 'Kitchen', description: 'Fully equipped kitchen' },
    { src: '/images/kitchen-2.jpg', label: 'Kitchen Detail', description: 'Cooking space' },
    { src: '/images/kitchen-3.jpg', label: 'Kitchen View', description: 'Modern appliances' },
    { src: '/images/bedroom.jpg', label: 'Master Bedroom', description: 'Master bedroom with premium linens' },
    { src: '/images/bedroom-2.jpg', label: 'Bedroom Detail', description: 'Cozy bedroom space' },
    { src: '/images/bathroom.jpg', label: 'Bathroom', description: 'Modern bathroom' },
    { src: '/images/bathroom-2.jpg', label: 'Bathroom Detail', description: 'Fresh and clean' },
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
              <div className="w-12 h-12 bg-stone-900 flex items-center justify-center rounded-xl">
                <Bed className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-display text-stone-900">{propertyDetails.specs.bedrooms}</p>
                <p className="text-sm text-stone-500">Bedroom</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-stone-900 flex items-center justify-center rounded-xl">
                <Bath className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-display text-stone-900">{propertyDetails.specs.bathrooms}</p>
                <p className="text-sm text-stone-500">Bathroom</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-stone-900 flex items-center justify-center rounded-xl">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-display text-stone-900">{propertyDetails.specs.maxGuests}</p>
                <p className="text-sm text-stone-500">Guests</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-stone-900 flex items-center justify-center rounded-xl">
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
          <div className="lg:col-span-2 lg:row-span-2 relative aspect-[4/3] lg:aspect-auto bg-stone-200 group overflow-hidden rounded-3xl min-h-[400px]">
            <Image
              src={images[activeImage].src}
              alt={images[activeImage].label}
              fill
              className="object-cover"
            />
            
            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white font-display text-xl">{images[activeImage].label}</p>
              <p className="text-white/80 text-sm">{images[activeImage].description}</p>
            </div>

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-white/90 px-4 py-2 rounded-full">
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
              className="relative aspect-square bg-stone-200 cursor-pointer hover:opacity-80 transition-opacity rounded-2xl overflow-hidden"
            >
              <Image
                src={image.src}
                alt={image.label}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* All Images Grid */}
        <div className="mt-8 grid grid-cols-5 md:grid-cols-10 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`aspect-square relative rounded-xl overflow-hidden transition-all ${
                activeImage === index ? 'ring-2 ring-stone-900' : 'hover:opacity-80'
              }`}
            >
              <Image
                src={image.src}
                alt={image.label}
                fill
                className="object-cover"
              />
            </button>
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
