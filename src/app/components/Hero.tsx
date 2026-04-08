'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { propertyDetails } from '@/lib/property';
import { ChevronLeft, ChevronRight, Calendar, Users, Star, ArrowRight } from 'lucide-react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isBefore, isSameDay, startOfDay, addDays, getDay } from 'date-fns';
import { useBookings } from '@/hooks/useBookings';

export default function Hero() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [numGuests, setNumGuests] = useState(2);
  const [activeImage, setActiveImage] = useState(0);

  const { bookedDates, isDateBooked, isDateDisabled } = useBookings();

  const images = [
    { src: '/images/exterior.jpg', label: 'Exterior View' },
    { src: '/images/living-room.jpg', label: 'Living Room' },
    { src: '/images/bedroom.jpg', label: 'Master Bedroom' },
    { src: '/images/bathroom.jpg', label: 'Bathroom' },
  ];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (!checkIn || (checkIn && checkOut)) {
      // Start new selection
      setCheckIn(date);
      setCheckOut(null);
    } else if (checkIn && !checkOut) {
      if (isSameDay(date, checkIn)) {
        // Same day clicked = 1 night stay (checkout next day)
        setCheckOut(addDays(date, 1));
      } else if (date < checkIn) {
        // Earlier date = new check-in
        setCheckIn(date);
      } else {
        // Later date = check-out
        setCheckOut(date);
      }
    }
  };

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  const calculateNights = () => {
    if (checkIn && checkOut) {
      return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateSubtotal = () => calculateNights() * propertyDetails.pricing.baseRate;
  const calculateTotal = () => calculateSubtotal() + propertyDetails.pricing.cleaningFee;

  const getBookingUrl = () => {
    if (!checkIn || !checkOut) return '/book';
    const checkInStr = format(checkIn, 'yyyy-MM-dd');
    const checkOutStr = format(checkOut, 'yyyy-MM-dd');
    return `/book?checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${numGuests}`;
  };

  return (
    <section className="min-h-screen bg-stone-100">
      <div className="section-padding max-w-7xl mx-auto py-12 lg:py-20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex items-center gap-1 bg-white px-4 py-2 shadow-sm rounded-full">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span className="text-sm font-medium text-stone-900">5.0 Guest Rating</span>
          </div>
          <div className="bg-white px-4 py-2 shadow-sm rounded-full">
            <span className="text-sm font-medium text-stone-900">Superhost</span>
          </div>
        </div>

        <div>
          {/* LEFT: Images */}
          <div className="relative">
            {/* Main Image */}
            <div className="aspect-[4/3] bg-stone-200 mb-4 relative group rounded-3xl overflow-hidden">
              <Image
                src={images[activeImage].src}
                alt={images[activeImage].label}
                fill
                className="object-cover"
                priority={activeImage === 0}
              />

              {/* Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 right-4 bg-white/90 px-4 py-2 rounded-full">
                <span className="text-sm font-medium">{activeImage + 1} / {images.length}</span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square relative rounded-2xl overflow-hidden transition-all ${activeImage === index ? 'ring-2 ring-stone-900' : 'hover:opacity-80'
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

            {/* Tagline */}
            <div className="mt-8 p-6 bg-stone-900 text-white rounded-3xl">
              <p className="font-display text-2xl mb-2">{propertyDetails.tagline}</p>
              <p className="text-white/70">Experience boutique comfort in the heart of Randburg. Perfect for couples, business travelers & solo adventurers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
