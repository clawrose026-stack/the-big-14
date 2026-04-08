'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { format, addDays, isSameDay, differenceInDays } from 'date-fns';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Circle, 
  Loader2, 
  ChevronRight, 
  Home, 
  Coffee, 
  Key, 
  ShieldCheck,
  Zap
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  icon: React.ReactNode;
}

interface PageProps {
  params: Promise<{ ref: string }>;
}

export default function BookingTimeline({ params }: PageProps) {
  const resolvedParams = use(params);
  const bookingRef = resolvedParams.ref;
  
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooking();
  }, [bookingRef]);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const { supabase } = await import('@/lib/supabase');

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('booking_ref', bookingRef)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error('Booking not found');
      }
      setBooking(data);
    } catch (err: any) {
      console.error('Error fetching booking:', err);
      setError(err.message || 'Booking not found');
    } finally {
      setLoading(false);
    }
  };

  const generateMilestones = (): TimelineEvent[] => {
    if (!booking) return [];

    const checkInDate = new Date(booking.check_in);
    const checkOutDate = new Date(booking.check_out);
    const today = new Date();
    const milestones: TimelineEvent[] = [];

    // Milestone 1: Booking Confirmed
    const isPaid = booking.payment_status === 'paid';
    milestones.push({
      id: 'confirmed',
      time: format(new Date(booking.created_at), 'MMM d, yyyy'),
      title: 'Booking Confirmed',
      description: 'Your reservation is secured and confirmed in our system.',
      status: 'completed',
      icon: <CheckCircle2 className="w-6 h-6 text-green-600" />,
    });

    // Milestone 2: Preparation
    const isPrepDone = today > checkInDate;
    milestones.push({
      id: 'preparation',
      time: format(addDays(checkInDate, -1), 'MMM d'),
      title: 'Guest Preparation',
      description: 'Our team is preparing your room for a premium experience.',
      status: isPrepDone ? 'completed' : 'current',
      icon: isPrepDone ? <ShieldCheck className="w-6 h-6 text-green-600" /> : <Zap className="w-6 h-6 text-amber-500 animate-pulse" />,
    });

    // Milestone 3: Check-in
    const hasCheckedIn = booking.status === 'checked_in' || booking.status === 'checked_out' || today > checkInDate;
    milestones.push({
      id: 'checkin',
      time: format(checkInDate, 'EEE, MMM d'),
      title: 'Arrival & Check-in',
      description: 'Check-in: 2:00 PM - 8:00 PM\n14 Beryl Avenue, Randburg',
      status: hasCheckedIn ? 'completed' : (isPrepDone ? 'current' : 'upcoming'),
      icon: <MapPin className={`w-6 h-6 ${hasCheckedIn ? 'text-green-600' : 'text-stone-400'}`} />,
    });

    // Milestone 4: The Stay
    const nights = differenceInDays(checkOutDate, checkInDate);
    milestones.push({
      id: 'stay',
      time: `${nights} ${nights === 1 ? 'Night' : 'Nights'}`,
      title: 'Your Stay at Big 14',
      description: 'Enjoy our 5-star amenities and boutique comfort.',
      status: booking.status === 'checked_in' ? 'current' : (booking.status === 'checked_out' ? 'completed' : 'upcoming'),
      icon: <Home className={`w-6 h-6 ${booking.status === 'checked_in' ? 'text-amber-500 animate-pulse' : 'text-stone-400'}`} />,
    });

    // Milestone 5: Check-out
    const hasCheckedOut = booking.status === 'checked_out' || today > checkOutDate;
    milestones.push({
      id: 'checkout',
      time: format(checkOutDate, 'EEE, MMM d'),
      title: 'Check-out & Farewell',
      description: 'Check-out by 11:00 AM\nWe hope to see you again!',
      status: hasCheckedOut ? 'completed' : (booking.status === 'checked_in' ? 'current' : 'upcoming'),
      icon: <Key className={`w-6 h-6 ${hasCheckedOut ? 'text-green-600' : 'text-stone-400'}`} />,
    });

    return milestones;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-8">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-stone-900" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-bold">B14</span>
          </div>
        </div>
        <p className="mt-4 text-stone-500 font-display animate-pulse">Loading tracker...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
          <Calendar className="w-10 h-10" />
        </div>
        <h1 className="font-display text-3xl text-stone-900 mb-2">Booking Not Found</h1>
        <p className="text-stone-600 max-w-md mb-8">
          We couldn't find a booking with reference <span className="font-mono font-bold text-stone-900">{bookingRef}</span>. Please double check your reference link.
        </p>
        <Link href="/track" className="btn-primary px-8">
          Try Another Reference
        </Link>
      </div>
    );
  }

  const milestones = generateMilestones();

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden">
      {/* Dynamic Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div className="section-padding max-w-7xl mx-auto py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-display text-xs font-bold">B14</span>
            </div>
            <span className="font-display text-xl text-stone-900">Big 14</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-xs font-bold text-stone-400 uppercase tracking-widest font-display">Status: {booking.status.replace('_', ' ')}</span>
            <Link href="/track" className="text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors">
              Change Ref
            </Link>
          </div>
        </div>
      </header>

      <main className="section-padding max-w-4xl mx-auto py-12 md:py-20">
        {/* Animated Background Element */}
        <div className="absolute top-20 right-0 -z-10 w-96 h-96 bg-stone-200/50 rounded-full blur-3xl opacity-50"></div>
        
        {/* Welcome Card */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl text-stone-900 mb-4">
            Hello, <span className="text-stone-600 italic">{booking.guest_first_name}</span>
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl leading-relaxed">
            Your premium stay at The Big 14 is mapped out. Follow your milestones as we prepare for your arrival.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-stone-100">
            <p className="text-[10px] uppercase tracking-tighter text-stone-400 font-bold mb-1">Booking Ref</p>
            <p className="font-mono text-sm font-bold text-stone-900 uppercase">{bookingRef}</p>
          </div>
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-stone-100">
            <p className="text-[10px] uppercase tracking-tighter text-stone-400 font-bold mb-1">Check In</p>
            <p className="font-display text-sm font-bold">{format(new Date(booking.check_in), 'MMM d, yyyy')}</p>
          </div>
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-stone-100">
            <p className="text-[10px] uppercase tracking-tighter text-stone-400 font-bold mb-1">Guests</p>
            <p className="font-display text-sm font-bold">{booking.num_guests} People</p>
          </div>
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-stone-100">
            <p className="text-[10px] uppercase tracking-tighter text-stone-400 font-bold mb-1">Total Paid</p>
            <p className="font-display text-sm font-bold">R{(booking.total_price / 100).toLocaleString()}</p>
          </div>
        </div>

        {/* Milestone Tracker UI */}
        <div className="relative">
          {/* Vertical Line Container */}
          <div className="absolute left-[27px] top-6 bottom-6 w-[2px] overflow-hidden">
             <div className="w-full h-full bg-stone-200"></div>
             {/* Progress overlay */}
             <div 
                className="absolute top-0 left-0 w-full bg-green-500 transition-all duration-1000"
                style={{ 
                  height: milestones.filter(m => m.status === 'completed').length * 25 + '%' 
                }}
             ></div>
          </div>

          <div className="space-y-12">
            {milestones.map((milestone, idx) => (
              <div 
                key={milestone.id} 
                className={`relative flex gap-8 group transition-all duration-500 ${
                  milestone.status === 'upcoming' ? 'opacity-50 grayscale' : 'opacity-100'
                }`}
              >
                {/* Milestone Node */}
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    milestone.status === 'completed' 
                      ? 'bg-green-100 shadow-green-100 shadow-md' 
                      : (milestone.status === 'current' ? 'bg-stone-900 shadow-xl' : 'bg-white border-2 border-stone-200')
                  }`}>
                    {milestone.status === 'completed' ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <div className={milestone.status === 'current' ? 'text-white' : 'text-stone-300'}>
                        {milestone.icon}
                      </div>
                    )}
                  </div>
                </div>

                {/* Milestone Content */}
                <div className="flex-1 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-[2px] text-stone-400 font-display">
                      {milestone.time}
                    </span>
                    {milestone.status === 'current' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-900 text-white rounded-full text-[9px] font-bold uppercase tracking-widest animate-bounce">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
                        Active Progress
                      </span>
                    )}
                  </div>
                  <h3 className={`font-display text-2xl mb-2 transition-colors ${
                    milestone.status === 'upcoming' ? 'text-stone-400' : 'text-stone-900'
                  }`}>
                    {milestone.title}
                  </h3>
                  <p className={`text-sm leading-relaxed max-w-md ${
                    milestone.status === 'upcoming' ? 'text-stone-300' : 'text-stone-600'
                  }`}>
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-24 bg-stone-900 rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-md">
            <h2 className="font-display text-3xl mb-4">Need help with your stay?</h2>
            <p className="text-stone-400 mb-8 leading-relaxed">
              Our concierge team is available 24/7 to ensure your experience at The Big 14 is exceptional.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/contact" 
                className="bg-white text-stone-900 px-8 py-3 rounded-full font-bold hover:bg-stone-100 transition-colors inline-flex items-center gap-2"
              >
                Contact Us <ChevronRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/" 
                className="bg-white/10 text-white border border-white/20 px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Abstract background graphics */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
          <div className="absolute bottom-0 right-10 w-32 h-32 border border-stone-700 rounded-full translate-y-1/2 opacity-30"></div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
