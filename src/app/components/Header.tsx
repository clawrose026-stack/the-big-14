'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="section-padding max-w-7xl mx-auto py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4">
          <img src="/images/big14_logo.png" alt="Logo" className="h-12" />

        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-stone-600 hover:text-stone-900 font-medium transition-colors">About</Link>
          <Link href="/contact" className="text-stone-600 hover:text-stone-900 font-medium transition-colors">Contact</Link>
          <Link href="/track" className="text-stone-600 hover:text-stone-900 font-medium transition-colors">Track Booking</Link>
          <Link href="/book" className="btn-primary text-sm py-2 px-6">Book Now</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-stone-900" />
          ) : (
            <Menu className="w-6 h-6 text-stone-900" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200">
          <nav className="section-padding py-4 flex flex-col gap-4">
            <Link
              href="/about"
              className="text-stone-600 hover:text-stone-900 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/track"
              className="text-stone-600 hover:text-stone-900 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Track Booking
            </Link>
            <Link
              href="/contact"
              className="text-stone-600 hover:text-stone-900 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/book"
              className="btn-primary text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
