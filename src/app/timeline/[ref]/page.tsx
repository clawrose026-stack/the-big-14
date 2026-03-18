'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format, addDays, isSameDay, differenceInDays } from 'date-fns';
import { Calendar, Clock, MapPin, CheckCircle, Circle, ArrowRight, Loader2 } from 'lucide-react';

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: 'checkin' | 'checkout' | 'activity' | 'meal';
  completed: boolean;
}

interface BookingTimelineProps {
  bookingRef: string;
}

export default function BookingTimeline({ bookingRef }: BookingTimelineProps) {
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooking();
  }, [bookingRef]);

  const fetchBooking = async () => {
    try {
      // Fetch booking from Supabase using booking_ref column
      const { supabase } = await import('@/lib/supabase');

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('booking_ref', bookingRef)
        .single();

      if (error) throw error;
      setBooking(data);
    } catch (err: any) {
      console.error('Error fetching booking:', err);
      setError('Booking not found');
    } finally {
      setLoading(false);
    }
  };

  const generateTimeline = (): TimelineEvent[] => {
    if (!booking) return [];

    const checkIn = new Date(booking.check_in);
    const checkOut = new Date(booking.check_out);
    const today = new Date();
    const events: TimelineEvent[] = [];

    // Check-in day
    events.push({
      id: 'checkin',
      time: format(checkIn, 'EEE, MMM d'),
      title: 'Check-in',
      description: '2:00 PM - 8:00 PM\n14 Beryl Avenue, Randburg\nHave your ID ready',
      icon: 'checkin',
      completed: today > checkIn || (isSameDay(today, checkIn) && today.getHours() >= 14),
    });

    // Generate daily events for each night
    const nights = differenceInDays(checkOut, checkIn);
    for (let i = 0; i < nights; i++) {
      const dayDate = addDays(checkIn, i);
      const isPast = today > dayDate;
      const isToday = isSameDay(today, dayDate);

      // Morning
      events.push({
        id: `day-${i}-morning`,
        time: format(dayDate, 'MMM d') + ' - 8:00 AM',
        title: 'Breakfast',
        description: 'Continental breakfast available\nDining area',
        icon: 'meal',
        completed: isPast || (isToday && today.getHours() >= 10),
      });

      // Afternoon
      events.push({
        id: `day-${i}-afternoon`,
        time: format(dayDate, 'MMM d') + ' - 2:00 PM',
        title: 'Your Stay',
        description: `Night ${i + 1} of ${nights}\nRelax and enjoy your accommodation`,
        icon: 'activity',
        completed: isPast,
      });

      // Evening
      events.push({
        id: `day-${i}-evening`,
        time: format(dayDate, 'MMM d') + ' - 6:00 PM',
        title: 'Evening',
        description: 'Dinner recommendations available\nLocal restaurants nearby',
        icon: 'meal',
        completed: isPast || (isToday && today.getHours() >= 20),
      });
    }

    // Check-out day
    events.push({
      id: 'checkout',
      time: format(checkOut, 'EEE, MMM d'),
      title: 'Check-out',
      description: 'By 11:00 AM\nLeave keys at reception\nSafe travels!',
      icon: 'checkout',
      completed: today >= checkOut,
    });

    return events;
  };

  const getIcon = (iconType: string, completed: boolean) => {
    const className = `w-6 h-6 ${completed ? 'text-green-600' : 'text-stone-400'}`;
    
    switch (iconType) {
      case 'checkin':
        return <MapPin className={className} />;
      case 'checkout':
        return <CheckCircle className={className} />;
      case 'meal':
        return <Clock className={className} />;
      default:
        return <Circle className={className} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-stone-600" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Booking not found'}</p>
          <Link href="/" className="btn-primary inline-block">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const timeline = generateTimeline();
  const checkIn = new Date(booking.check_in);
  const checkOut = new Date(booking.check_out);
  const nights = differenceInDays(checkOut, checkIn);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="section-padding max-w-6xl mx-auto py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center">
              <span className="text-white font-display text-sm font-bold">B14</span>
            </div>
            <span className="font-display text-xl text-stone-900">Big 14</span>
          </Link>
          <Link href="/" className="text-stone-600 hover:text-stone-900 font-medium">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="section-padding max-w-3xl mx-auto py-12">
        {/* Booking Header */}
        <div className="bg-white p-8 rounded-3xl shadow-lg mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-stone-600" />
            <h1 className="font-display text-2xl text-stone-900">Your Booking Timeline</h1>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-stone-50 p-4 rounded-xl">
              <p className="text-sm text-stone-500 mb-1">Reference</p>
              <p className="font-display text-lg">{bookingRef}</p>
            </div>
            <div className="bg-stone-50 p-4 rounded-xl">
              <p className="text-sm text-stone-500 mb-1">Dates</p>
              <p className="font-medium">{format(checkIn, 'MMM d')} - {format(checkOut, 'MMM d')}</p>
            </div>
            <div className="bg-stone-50 p-4 rounded-xl">
              <p className="text-sm text-stone-500 mb-1">Nights</p>
              <p className="font-medium">{nights} {nights === 1 ? 'night' : 'nights'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-stone-600">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Completed</span>
            <div className="w-3 h-3 rounded-full bg-stone-300 ml-4"></div>
            <span>Upcoming</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="font-display text-xl text-stone-900 mb-6">Itinerary</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-stone-200"></div>
            
            {/* Events */}
            <div className="space-y-6">
              {timeline.map((event, index) => (
                <div key={event.id} className="relative flex gap-4">
                  {/* Icon */}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                    event.completed ? 'bg-green-100' : 'bg-stone-100'
                  }`}>
                    {getIcon(event.icon, event.completed)}
                  </div>
                  
                  {/* Content */}
                  <div className={`flex-1 pb-6 ${index !== timeline.length - 1 ? 'border-b border-stone-100' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-stone-500">{event.time}</span>
                      {event.completed && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Done
                        </span>
                      )}
                    </div>
                    <h3 className={`font-semibold ${event.completed ? 'text-stone-600' : 'text-stone-900'}`}>
                      {event.title}
                    </h3>
                    <p className="text-stone-600 text-sm whitespace-pre-line">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link 
            href="/contact" 
            className="flex-1 bg-stone-900 text-white py-4 px-6 rounded-xl text-center font-medium hover:bg-stone-800 transition-colors"
          >
            Contact Support
          </Link>
          <Link 
            href="/" 
            className="flex-1 border-2 border-stone-900 text-stone-900 py-4 px-6 rounded-xl text-center font-medium hover:bg-stone-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
