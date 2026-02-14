'use client';

import { useState, useEffect } from 'react';
import { propertyDetails } from '@/lib/property';
import { supabase, Booking } from '@/lib/supabase';
import { ChevronLeft, ChevronRight, Users, Check, Loader2, Calendar } from 'lucide-react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isBefore, addDays } from 'date-fns';

export default function BookingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [numGuests, setNumGuests] = useState(1);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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

  const isDateBooked = (date: Date) => bookedDates.some(bookedDate => isSameDay(bookedDate, date));
  const isDateDisabled = (date: Date) => isBefore(date, new Date()) || isDateBooked(date);

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (checkIn && !checkOut) {
      if (isBefore(date, checkIn)) {
        setCheckIn(date);
      } else {
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

      const { error: supabaseError } = await supabase.from('bookings').insert([booking]);
      if (supabaseError) throw supabaseError;

      setSuccess(true);
      fetchBookedDates();
    } catch (err) {
      setError('Oops! Something went wrong. Please try again or WhatsApp us directly.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-sage-light p-12 rounded-3xl text-center">
        <div className="w-20 h-20 bg-sage rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h3 className="font-display text-2xl font-bold text-charcoal mb-4">Yay! Booking Request Sent! 🎉</h3>
        <p className="text-warm-gray mb-6">We&apos;ll get back to you within 24 hours. Can&apos;t wait to host you!</p>
        <button onClick={() => { setSuccess(false); setCheckIn(null); setCheckOut(null); setGuestName(''); setGuestEmail(''); setGuestPhone(''); }} className="btn-primary">
          Book Another Stay
        </button>
      </div>
    );
  }

  return (
    <section id="book" className="py-20 bg-white">
      <div className="section-padding max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-coral-light text-coral px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Book Direct & Save 💰
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            When Are You Visiting?
          </h2>
          <p className="text-lg text-warm-gray">
            Skip the platform fees — book directly with us!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar Card */}
          <div className="bg-cream p-8 rounded-3xl">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))} className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-sand transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="font-display text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h3>
              <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-sand transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-center text-sm font-bold text-warm-gray py-2">{day}</div>
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
                      aspect-square flex items-center justify-center text-sm font-bold rounded-xl transition-all
                      ${isSelected ? 'bg-coral text-white' : ''}
                      ${isInRange ? 'bg-coral-light' : ''}
                      ${isBooked ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''}
                      ${isDisabled && !isBooked ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-sand'}
                    `}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-6 text-sm justify-center">
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-coral rounded-lg" /><span>Selected</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-200 rounded-lg" /><span>Booked</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-gray-300 rounded-lg" /><span>Free</span></div>
            </div>
          </div>

          {/* Booking Form Card */}
          <div>
            {/* Price Summary */}
            <div className="bg-charcoal text-white p-8 rounded-3xl mb-6">
              <h3 className="font-display text-2xl font-bold mb-6">Your Stay 💫</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between"><span className="text-white/70">Check-in</span><span className="font-semibold">{checkIn ? format(checkIn, 'MMM d') : 'Pick date'}</span></div>
                <div className="flex justify-between"><span className="text-white/70">Check-out</span><span className="font-semibold">{checkOut ? format(checkOut, 'MMM d') : 'Pick date'}</span></div>
                <div className="flex justify-between"><span className="text-white/70">Nights</span><span className="font-semibold">{calculateNights()} {calculateNights() === 1 ? 'night' : 'nights'}</span></div>
                <div className="flex justify-between"><span className="text-white/70">Guests</span><span className="font-semibold">{numGuests}</span></div>
              </div>
              <div className="border-t border-white/20 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Total</span>
                  <span className="font-display text-3xl font-bold">R{calculateTotal().toLocaleString()}</span>
                </div>
                <p className="text-sm text-white/50 mt-2">Includes R{propertyDetails.pricing.cleaningFee} cleaning fee</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="bg-sand p-4 rounded-2xl">
                <label className="block text-sm font-bold text-charcoal mb-2">Guests</label>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setNumGuests(Math.max(1, numGuests - 1))} className="w-10 h-10 bg-white rounded-full font-bold hover:bg-coral hover:text-white transition-colors">-</button>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-coral" />
                    <span className="text-xl font-bold w-6 text-center">{numGuests}</span>
                  </div>
                  <button type="button" onClick={() => setNumGuests(Math.min(propertyDetails.specs.maxGuests, numGuests + 1))} className="w-10 h-10 bg-white rounded-full font-bold hover:bg-coral hover:text-white transition-colors">+</button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">Your Name *</label>
                <input type="text" required value={guestName} onChange={(e) => setGuestName(e.target.value)} className="w-full px-5 py-4 bg-cream rounded-2xl border-0 focus:ring-2 focus:ring-coral" placeholder="John Doe" />
              </div>

              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">Email *</label>
                <input type="email" required value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} className="w-full px-5 py-4 bg-cream rounded-2xl border-0 focus:ring-2 focus:ring-coral" placeholder="john@email.com" />
              </div>

              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">Phone *</label>
                <input type="tel" required value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} className="w-full px-5 py-4 bg-cream rounded-2xl border-0 focus:ring-2 focus:ring-coral" placeholder="+27 63 900 1897" />
              </div>

              {error && <div className="bg-red-100 text-red-600 p-4 rounded-2xl text-sm">{error}</div>}

              <button type="submit" disabled={!checkIn || !checkOut || submitting} className="w-full btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {submitting ? <><Loader2 className="w-5 h-5 animate-spin" />Sending...</> : 'Request Booking 🎉'}
              </button>

              <p className="text-sm text-warm-gray text-center">No payment yet. We&apos;ll confirm your dates first! ✌️</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
