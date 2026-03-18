'use client';

import Link from 'next/link';
import { Calendar } from 'lucide-react';

export default function FloatingButton() {
  return (
    <Link
      href="/book"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-8 py-4 rounded-full font-semibold shadow-2xl hover:bg-stone-800 hover:scale-105 transition-all flex items-center gap-3"
    >
      <Calendar className="w-5 h-5" />
      <span>Book</span>
    </Link>
  );
}
