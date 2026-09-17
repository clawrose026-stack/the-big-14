'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

/**
 * A booking shortcut that appears once the hero has scrolled away, and hides
 * itself again while the booking section is actually on screen (where the real
 * platform links live).
 */
export default function FloatingButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById('booking-platforms');
    let bookingVisible = false;

    const observer = target
      ? new IntersectionObserver(
          ([entry]) => {
            bookingVisible = entry.isIntersecting;
            update();
          },
          { threshold: 0.15 }
        )
      : null;

    const update = () => {
      const past = window.scrollY > window.innerHeight * 0.6;
      // Stand down near the end of the page, where the footer's own CTA takes over.
      const nearBottom =
        window.innerHeight + window.scrollY >
        document.body.scrollHeight - window.innerHeight * 0.75;
      setShow(past && !bookingVisible && !nearBottom);
    };

    if (target) observer?.observe(target);
    window.addEventListener('scroll', update, { passive: true });
    update();

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', update);
    };
  }, []);

  return (
    <Link
      href="/#booking-platforms"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`fixed z-40 bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 bg-stone-900/95 backdrop-blur text-white pl-6 pr-7 py-3.5 rounded-full font-semibold text-sm shadow-[0_16px_40px_-12px_rgba(28,25,23,0.7)] hover:bg-stone-800 transition-all duration-300 flex items-center gap-2.5 ${
        show
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <Calendar className="w-4 h-4" />
      <span>Book Your Stay</span>
    </Link>
  );
}
