'use client';

import { useState, useEffect } from 'react';
import { propertyDetails } from '@/lib/property';
import { supabase, Booking } from '@/lib/supabase';
import { ChevronLeft, ChevronRight, Calendar, Users, Check, Loader2 } from 'lucide-react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isBefore, addDays } from 'date-fns';

export default function BookingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [numGuests, setNumGuests] = useState(1);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Load booked dates from Supabase
  useEffect(() => {
    fetchBookedDates();
  }, []);

  const fetchBookedDates = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('check_in, check_out')
        .in('status', ['confirmed', 'pending']);

      if (error) throw error;

      const dates: Date[] = [];
      data?.forEach((booking: { check_in: string; check_out: string }) => {
        const start = new Date(booking.check_in);
        const end = new Date(booking.check_out);
        const range = eachDayOfInterval({ start, end: addDays(end, -1) });
        dates.push(...range);
      });

      setBookedDates(dates);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const isDateBooked = (date: Date) => {
    return bookedDates.some(bookedDate => isSameDay(bookedDate, date));
  };

  const isDateDisabled = (date: Date) => {
    return isBefore(date, new Date()) || isDateBooked(date);
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (checkIn && !checkOut) {
      if (isBefore(date, checkIn)) {
        setCheckIn(date);
      } else {
        // Check if any dates in between are booked
        const range = eachDayOfInterval({ start: checkIn, end: date });
        const hasBookedDate = range.some(d => isDateBooked(d) && !isSameDay(d, date));
        
        if (hasBookedDate) {
          setCheckIn(date);
          setCheckOut(null);
        } else {
          setCheckOut(date);
        }
      }
    }
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * propertyDetails.pricing.baseRate + propertyDetails.pricing.cleaningFee;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return;

    setSubmitting(true);
    setError('');

    try {
      const booking: Omit<Booking, 'id' | 'created_at'> = {
        check_in: checkIn.toISOString().split('T')[0],
        check_out: checkOut.toISOString().split('T')[0],
        guest_name: guestName,
        guest_email: guestEmail,
        guest_phone: guestPhone,
        num_guests: numGuests,
        total_price: calculateTotal(),
        status: 'pending',
      };

      const { error: supabaseError } = await supabase
        .from('bookings')
        .insert([booking]);

      if (supabaseError) throw supabaseError;

      setSuccess(true);
      fetchBookedDates(); // Refresh booked dates
    } catch (err) {
      setError('Something went wrong. Please try again or contact us directly.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-stone-50 p-12 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-display text-2xl text-stone-900 mb-4">Booking Request Received!</h3>
        <p className="text-stone-600 mb-6">
          We&apos;ll review your request and get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            setCheckIn(null);
            setCheckOut(null);
            setGuestName('');
            setGuestEmail('');
            setGuestPhone('');
          }}
          className="btn-primary"
        >
          Make Another Booking
        </button>
      </div>
    );
  }

  return (
    <section id="book" className="py-24 bg-white">
      <div className="section-padding max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-stone-500 text-sm tracking-widest uppercase mb-4 block">
            Book Your Stay
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-stone-900 mb-4">
            Reserve Your Dates
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Select your check-in and check-out dates below. Book direct and save on platform fees.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calendar */}
          <div className="bg-stone-50 p-8">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-stone-200 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="font-display text-xl">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-stone-200 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-stone-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => {
                const isSelected = (checkIn && isSameDay(day, checkIn)) || (checkOut && isSameDay(day, checkOut));
                const isInRange = checkIn && checkOut && day > checkIn && day < checkOut;
                const isDisabled = isDateDisabled(day);
                const isBooked = isDateBooked(day);

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(day)}
                    disabled={isDisabled}
                    className={`
                      aspect-square flex items-center justify-center text-sm font-medium transition-all
                      ${isSelected ? 'bg-stone-900 text-white' : ''}
                      ${isInRange ? 'bg-stone-200' : ''}
                      ${isBooked ? 'bg-red-100 text-red-500 cursor-not-allowed' : ''}
                      ${isDisabled && !isBooked ? 'text-stone-300 cursor-not-allowed' : 'hover:bg-stone-200'}
                    `}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-stone-900" />
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100" />
                <span>Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border border-stone-300" />
                <span>Available</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div>
            {/* Selected Dates Summary */}
            <div className="bg-stone-900 text-white p-8 mb-8">
              <h3 className="font-display text-2xl mb-6">Booking Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-white/70">Check-in</span>
                  <span className="font-medium">
                    {checkIn ? format(checkIn, 'EEE, MMM d, yyyy') : 'Select date'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Check-out</span>
                  <span className="font-medium">
                    {checkOut ? format(checkOut, 'EEE, MMM d, yyyy') : 'Select date'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Nights</span>
                  <span className="font-medium">{calculateNights()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Guests</span>
                  <span className="font-medium">{numGuests}</span>
                </div>
              </div>

              <div className="border-t border-white/20 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Total</span>
                  <span className="font-display text-3xl">R{calculateTotal().toLocaleString()}</span>
                </div>
                <p className="text-sm text-white/50 mt-2">
                  Includes cleaning fee of R{propertyDetails.pricing.cleaningFee}
                </p>
              </div>
            </div>

            {/* Guest Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Number of Guests
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setNumGuests(Math.max(1, numGuests - 1))}
                    className="w-12 h-12 border border-stone-300 flex items-center justify-center hover:bg-stone-100"
                  >
                    -
                  </button>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-stone-500" />
                    <span className="text-xl font-medium w-8 text-center">{numGuests}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNumGuests(Math.min(propertyDetails.specs.maxGuests, numGuests + 1))}
                    className="w-12 h-12 border border-stone-300 flex items-center justify-center hover:bg-stone-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none"
                  placeholder="+27 63 900 1897"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!checkIn || !checkOut || submitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Request Booking'
                )}
              </button>

              <p className="text-sm text-stone-500 text-center">
                You won&apos;t be charged yet. We&apos;ll confirm availability within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
