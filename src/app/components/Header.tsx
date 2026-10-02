'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/house-rules', label: 'House Rules' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Deepen the header's border and shadow once the page moves.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the mobile menu while it is open.
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/85 backdrop-blur-md transition-shadow duration-300 ${
        scrolled
          ? 'border-b border-stone-200 shadow-[0_1px_20px_-8px_rgba(28,25,23,0.25)]'
          : 'border-b border-transparent'
      }`}
    >
      <div className="section-padding max-w-7xl mx-auto h-[4.75rem] flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0 transition-opacity hover:opacity-70"
          aria-label="The Big 14 — home"
        >
          <Image
            src="/images/big14_logo.png"
            alt="The Big 14"
            width={140}
            height={48}
            priority
            className="h-10 sm:h-11 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            // trailingSlash is on, so the pathname arrives as "/about/".
            const active = pathname.replace(/\/$/, '') === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  active
                    ? 'text-stone-900'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-4 right-4 -bottom-0.5 h-px bg-stone-900 origin-left transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="/#booking-platforms"
            className="btn-primary ml-3 !py-2.5 !px-6 !text-sm"
          >
            Book
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden -mr-2 p-2 text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200 animate-fade">
          <nav className="section-padding py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-stone-700 hover:text-stone-900 py-3 border-b border-stone-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#booking-platforms"
              className="btn-primary w-full mt-5"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Your Stay
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
