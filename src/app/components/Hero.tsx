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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                  className={`aspect-square relative rounded-2xl overflow-hidden transition-all ${
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

            {/* Tagline */}
            <div className="mt-8 p-6 bg-stone-900 text-white rounded-3xl">
              <p className="font-display text-2xl mb-2">{propertyDetails.tagline}</p>
              <p className="text-white/70">Experience boutique comfort in the heart of Randburg. Perfect for couples, business travelers & solo adventurers.</p>
            </div>
          </div>

          {/* RIGHT: Date Picker */}
          <div id="date-picker" className="bg-white p-8 shadow-lg rounded-3xl">
            <h1 className="font-display text-3xl text-stone-900 mb-2">
              {propertyDetails.name}
            </h1>
            <p className="text-stone-600 mb-6">{propertyDetails.location.address}</p>

            {/* Calendar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-stone-100 transition-colors rounded-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="font-display text-lg">{format(currentMonth, 'MMMM yyyy')}</h3>
                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-stone-100 transition-colors rounded-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-stone-500 py-2">{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before the first of the month */}
                {Array.from({ length: getDay(monthStart) }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}
                {/* Day cells */}
                {days.map((day, index) => {
                  const isSelected = (checkIn && isSameDay(day, checkIn)) || (checkOut && isSameDay(day, checkOut));
                  const isInRange = checkIn && checkOut && day > checkIn && day < checkOut;
                  
                  const isDisabled = isDateDisabled(day);

                  return (
                    <button
                      key={index}
                      onClick={() => handleDateClick(day)}
                      disabled={isDisabled}
                      className={`
                        aspect-square flex items-center justify-center text-sm font-medium rounded-lg transition-all
                        ${isSelected ? 'bg-stone-900 text-white' : ''}
                        ${isInRange ? 'bg-stone-200' : ''}
                        ${isDisabled ? 'date-crossed-out cursor-not-allowed opacity-50 text-stone-400' : 'hover:bg-stone-100'}
                      `}
                    >
                      {format(day, 'd')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Dates */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1 border border-stone-300 p-3 rounded-xl">
                <label className="block text-xs text-stone-500 uppercase mb-1">Check-in</label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-stone-400" />
                  <span className="font-medium text-sm">
                    {checkIn ? format(checkIn, 'MMM d') : 'Select'}
                  </span>
                </div>
              </div>
              <div className="flex-1 border border-stone-300 p-3 rounded-xl">
                <label className="block text-xs text-stone-500 uppercase mb-1">Check-out</label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-stone-400" />
                  <span className="font-medium text-sm">
                    {checkOut ? format(checkOut, 'MMM d') : 'Select'}
                  </span>
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="border border-stone-300 p-3 mb-4 rounded-xl">
              <label className="block text-xs text-stone-500 uppercase mb-2">Guests</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setNumGuests(Math.max(1, numGuests - 1))}
                  className="w-8 h-8 border border-stone-300 rounded-lg flex items-center justify-center hover:bg-stone-100"
                >
                  -
                </button>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-stone-400" />
                  <span className="font-medium">{numGuests}</span>
                </div>
                <button
                  onClick={() => setNumGuests(Math.min(propertyDetails.specs.maxGuests, numGuests + 1))}
                  className="w-8 h-8 border border-stone-300 rounded-lg flex items-center justify-center hover:bg-stone-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price & CTA */}
            {checkIn && checkOut && (
              <div className="bg-stone-50 p-4 rounded-xl mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-stone-600">R{propertyDetails.pricing.baseRate} x {calculateNights()} nights</span>
                  <span>R{calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-stone-600">Cleaning fee</span>
                  <span>R{propertyDetails.pricing.cleaningFee}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200">
                  <span className="font-semibold">Total</span>
                  <span className="font-display text-xl">R{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            )}

            <Link
              href={getBookingUrl()}
              className={`w-full btn-primary flex items-center justify-center gap-2 ${(!checkIn || !checkOut) ? 'opacity-50 pointer-events-none' : ''}`}
            >
              Check Availability <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
