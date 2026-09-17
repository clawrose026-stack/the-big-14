'use client';

import { useState } from 'react';
import Image from 'next/image';
import Reveal from './Reveal';
import { propertyDetails } from '@/lib/property';
import { ChevronLeft, ChevronRight, Bed, Bath, Users, Home } from 'lucide-react';

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

const specs = [
  { icon: Bed, value: propertyDetails.specs.bedrooms, label: 'Bedroom' },
  { icon: Bath, value: propertyDetails.specs.bathrooms, label: 'Bathroom' },
  { icon: Users, value: propertyDetails.specs.maxGuests, label: 'Guests' },
  { icon: Home, value: propertyDetails.specs.propertyType, label: 'Type' },
];

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(0);

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section id="about" className="py-20 lg:py-28 bg-stone-50 scroll-mt-24">
      <div className="section-padding max-w-7xl mx-auto">
        {/* Header */}
        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-12 lg:mb-16">
          <div className="max-w-xl">
            <span className="eyebrow mb-4">The Space</span>
            <h2 className="font-display text-4xl lg:text-5xl text-stone-900">
              Where Comfort Meets Style
            </h2>
          </div>

          {/* Property Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 shrink-0">
            {specs.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="bg-white rounded-2xl px-4 py-4 ring-1 ring-stone-900/5 flex items-center gap-3"
              >
                <div className="w-10 h-10 shrink-0 bg-stone-900 flex items-center justify-center rounded-xl">
                  <Icon className="w-[1.125rem] h-[1.125rem] text-white" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-lg leading-tight text-stone-900 truncate">
                    {value}
                  </p>
                  <p className="text-xs text-stone-500">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Featured image */}
        <Reveal>
          <div className="relative aspect-[4/3] sm:aspect-[16/9] bg-stone-200 group overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-35px_rgba(28,25,23,0.55)]">
            {images.map((image, index) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.label}
                fill
                sizes="(max-width: 1280px) 100vw, 1152px"
                className={`object-cover transition-opacity duration-700 ${
                  activeImage === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}

            <button
              onClick={prevImage}
              aria-label="Previous photo"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white flex items-center justify-center rounded-full shadow-lg transition-all md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100 hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next photo"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white flex items-center justify-center rounded-full shadow-lg transition-all md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100 hover:scale-105"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image info */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-5 sm:p-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-white font-display text-lg sm:text-xl">
                  {images[activeImage].label}
                </p>
                <p className="text-white/80 text-sm">
                  {images[activeImage].description}
                </p>
              </div>
              <span className="shrink-0 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold tabular-nums">
                {activeImage + 1} / {images.length}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Thumbnail strip */}
        <Reveal
          delay={80}
          className="mt-4 grid grid-cols-6 md:grid-cols-12 gap-2 sm:gap-3"
        >
          {images.map((image, index) => (
            <button
              key={image.src}
              onClick={() => setActiveImage(index)}
              aria-label={`Show ${image.label}`}
              aria-current={activeImage === index}
              className={`aspect-square relative rounded-xl overflow-hidden transition-all duration-300 ${
                activeImage === index
                  ? 'ring-2 ring-stone-900 ring-offset-2 ring-offset-stone-50'
                  : 'opacity-55 hover:opacity-100'
              }`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="10vw"
                className="object-cover"
              />
            </button>
          ))}
        </Reveal>

        {/* Description */}
        <Reveal delay={120} className="mt-14 lg:mt-20 max-w-3xl">
          <p className="text-lg text-stone-600 leading-relaxed whitespace-pre-line">
            {propertyDetails.description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
