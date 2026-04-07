import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { isSameDay, eachDayOfInterval, addDays, isBefore, startOfDay, parseISO } from 'date-fns';

export function useBookings() {
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookedDates = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch bookings that are confirmed, checked_in, or pending (to be safe)
      const { data, error } = await supabase
        .from('bookings')
        .select('check_in, check_out')
        .in('status', ['confirmed', 'checked_in', 'pending'])
        .in('payment_status', ['paid', 'pending']); // Only consider paid or pending payments

      if (error) throw error;

      const dates: Date[] = [];
      data?.forEach((booking: { check_in: string; check_out: string }) => {
        const start = parseISO(booking.check_in);
        const end = parseISO(booking.check_out);
        // Exclude the checkout day as it's available for check-in
        const range = eachDayOfInterval({ start, end: addDays(end, -1) });
        dates.push(...range);
      });

      setBookedDates(dates);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookedDates();
  }, [fetchBookedDates]);

  const isDateBooked = (date: Date) => bookedDates.some(bookedDate => isSameDay(bookedDate, date));

  const isDateDisabled = (date: Date) => {
    const now = new Date();
    const isPastDay = isBefore(startOfDay(date), startOfDay(now));
    const isTodayAndLate = isSameDay(date, now) && now.getHours() >= 20;
    return isPastDay || isTodayAndLate || isDateBooked(date);
  };

  const checkAvailability = async (checkIn: Date, checkOut: Date) => {
    // Re-fetch to get freshest data before confirming
    const { data, error } = await supabase
      .from('bookings')
      .select('check_in, check_out')
      .in('status', ['confirmed', 'checked_in', 'pending']);

    if (error) return false;

    const currentBookedDates: Date[] = [];
    data?.forEach((booking: { check_in: string; check_out: string }) => {
      const start = parseISO(booking.check_in);
      const end = parseISO(booking.check_out);
      const range = eachDayOfInterval({ start, end: addDays(end, -1) });
      currentBookedDates.push(...range);
    });

    const range = eachDayOfInterval({ start: checkIn, end: addDays(checkOut, -1) });
    const hasConflict = range.some(date => 
      currentBookedDates.some(bookedDate => isSameDay(bookedDate, date))
    );

    return !hasConflict;
  };

  return {
    bookedDates,
    loading,
    fetchBookedDates,
    isDateBooked,
    isDateDisabled,
    checkAvailability
  };
}
