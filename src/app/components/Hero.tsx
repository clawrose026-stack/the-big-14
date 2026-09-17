'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { propertyDetails } from '@/lib/property';
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';

const images = [
  { src: '/images/exterior.jpg', label: 'Exterior View' },
  { src: '/images/living-room.jpg', label: 'Living Room' },
  { src: '/images/bedroom.jpg', label: 'Master Bedroom' },
  { src: '/images/bathroom.jpg', label: 'Bathroom' },
];

export default function Hero() {
  const [activeImage, setActiveImage] = useState(0);

  const nextImage = useCallback(
    () => setActiveImage((prev) => (prev + 1) % images.length),
    []
  );
  const prevImage = useCallback(
    () => setActiveImage((prev) => (prev - 1 + images.length) % images.length),
    []
  );

  // Arrow keys move through the gallery once it has been interacted with.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    const frame = document.getElementById('hero-carousel');
    frame?.addEventListener('keydown', onKey as EventListener);
    return () => frame?.removeEventListener('keydown', onKey as EventListener);
  }, [nextImage, prevImage]);

  return (
    <section className="relative bg-gradient-to-b from-stone-100 to-white overflow-hidden">
      {/* soft light behind the copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 w-[38rem] h-[38rem] rounded-full bg-white/70 blur-3xl"
      />

      <div className="relative section-padding max-w-7xl mx-auto pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <div className="animate-rise">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-xs font-semibold text-stone-900 shadow-sm ring-1 ring-stone-900/5">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                5.0 Guest Rating
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-xs font-semibold text-stone-600 shadow-sm ring-1 ring-stone-900/5">
                <MapPin className="w-3.5 h-3.5" />
                {propertyDetails.location.neighborhood},{' '}
                {propertyDetails.location.city}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl xl:text-[3.75rem] leading-[1.05] text-stone-900">
              {propertyDetails.tagline}
            </h1>

            <p className="mt-6 text-lg text-stone-600 leading-relaxed max-w-lg">
              Experience boutique comfort in the heart of Randburg. Perfect for
              couples, business travellers and solo adventurers.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link href="/#booking-platforms" className="btn-primary">
                Book Your Stay
              </Link>
              <Link href="/#about" className="btn-secondary">
                Explore the Space
              </Link>
            </div>

            {/* Key facts */}
            <dl className="mt-10 pt-8 border-t border-stone-900/10 flex flex-wrap gap-x-10 gap-y-5">
              <div>
                <dt className="text-xs uppercase tracking-widest text-stone-500 mb-1">
                  From
                </dt>
                <dd className="font-display text-2xl text-stone-900">
                  R{propertyDetails.pricing.baseRate}
                  <span className="text-sm font-body text-stone-500 font-normal">
                    {' '}
                    / night
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-stone-500 mb-1">
                  Sleeps
                </dt>
                <dd className="font-display text-2xl text-stone-900">
                  {propertyDetails.specs.maxGuests}
                  <span className="text-sm font-body text-stone-500 font-normal">
                    {' '}
                    guests
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-stone-500 mb-1">
                  Check-in
                </dt>
                <dd className="font-display text-2xl text-stone-900">
                  Self
                  <span className="text-sm font-body text-stone-500 font-normal">
                    {' '}
                    service
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Carousel */}
          <div
            id="hero-carousel"
            tabIndex={-1}
            className="animate-rise [animation-delay:120ms] outline-none"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-stone-200 rounded-[1.75rem] overflow-hidden shadow-[0_30px_60px_-30px_rgba(28,25,23,0.5)] group">
              {images.map((image, index) => (
                <Image
                  key={image.src}
                  src={image.src}
                  alt={image.label}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority={index === 0}
                  className={`object-cover transition-opacity duration-700 ${
                    activeImage === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}

              {/* Navigation — always reachable on touch, fades in on pointer devices */}
              <button
                onClick={prevImage}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100 hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100 hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Caption + counter */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between gap-4 bg-gradient-to-t from-black/55 via-black/10 to-transparent">
                <p className="text-white font-medium text-sm sm:text-base drop-shadow">
                  {images[activeImage].label}
                </p>
                <span className="shrink-0 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold tabular-nums">
                  {activeImage + 1} / {images.length}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3 mt-3">
              {images.map((image, index) => (
                <button
                  key={image.src}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show ${image.label}`}
                  aria-current={activeImage === index}
                  className={`aspect-[4/3] relative rounded-xl overflow-hidden transition-all duration-300 ${
                    activeImage === index
                      ? 'ring-2 ring-stone-900 ring-offset-2 ring-offset-stone-100'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="15vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
