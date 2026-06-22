import { useState, useEffect, useCallback } from "react";
import { isSameDay, eachDayOfInterval, addDays, isBefore, startOfDay, parseISO } from "date-fns";

type BookedRange = { check_in: string; check_out: string };

export function useBookings() {
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookedDates = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/bookings");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      const dates: Date[] = [];
      (data.bookedDates as BookedRange[]).forEach(
        (booking: BookedRange) => {
          const start = parseISO(booking.check_in);
          const end = parseISO(booking.check_out);
          const range = eachDayOfInterval({
            start,
            end: addDays(end, -1),
          });
          dates.push(...range);
        }
      );

      setBookedDates(dates);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookedDates();
  }, [fetchBookedDates]);

  const isDateBooked = (date: Date) =>
    bookedDates.some((bookedDate) => isSameDay(bookedDate, date));

  const isDateDisabled = (date: Date) => {
    const now = new Date();
    const isPastDay = isBefore(startOfDay(date), startOfDay(now));
    const isTodayAndLate =
      isSameDay(date, now) && now.getHours() >= 20;
    return isPastDay || isTodayAndLate || isDateBooked(date);
  };

  const checkAvailability = async (checkIn: Date, checkOut: Date) => {
    const res = await fetch("/api/bookings");
    if (!res.ok) return false;
    const data = await res.json();

    const currentBookedDates: Date[] = [];
    (data.bookedDates as BookedRange[]).forEach(
      (booking: BookedRange) => {
        const start = parseISO(booking.check_in);
        const end = parseISO(booking.check_out);
        const range = eachDayOfInterval({
          start,
          end: addDays(end, -1),
        });
        currentBookedDates.push(...range);
      }
    );

    const range = eachDayOfInterval({
      start: checkIn,
      end: addDays(checkOut, -1),
    });
    const hasConflict = range.some((date) =>
      currentBookedDates.some((bookedDate) =>
        isSameDay(bookedDate, date)
      )
    );

    return !hasConflict;
  };

  return {
    bookedDates,
    loading,
    fetchBookedDates,
    isDateBooked,
    isDateDisabled,
    checkAvailability,
  };
}