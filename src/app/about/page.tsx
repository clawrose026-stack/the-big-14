'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import { ChevronLeft, Heart, Coffee, Home, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-100">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-stone-900 text-white py-20">
          <div className="section-padding max-w-4xl mx-auto text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8">
              <ChevronLeft className="w-5 h-5" /> Back to Home
            </Link>
            <h1 className="font-display text-5xl md:text-6xl mb-6">Welcome to Big 14</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              A boutique guest house experience crafted with care, comfort, and a personal touch
            </p>
          </div>
        </section>

        {/* Hosts Section */}
        <section className="py-20 section-padding max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <span className="text-stone-500 text-sm tracking-widest uppercase mb-4 block">Your Hosts</span>
              <h2 className="font-display text-4xl text-stone-900 mb-6">Meet Brendon & Partner</h2>
              <div className="space-y-4 text-stone-600 text-lg leading-relaxed">
                <p>
                  We're a young couple who fell in love with the idea of creating a home away from home 
                  for travelers visiting Johannesburg. What started as a simple spare room has grown into 
                  the Big 14 — a thoughtfully designed guest house that reflects our passion for hospitality 
                  and attention to detail.
                </p>
                <p>
                  When we're not hosting guests, you'll find us exploring the best coffee spots in Randburg, 
                  hiking local trails, or planning our next adventure. We understand what travelers need 
                  because we're travelers ourselves.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] bg-stone-200 rounded-2xl flex items-center justify-center">
                <span className="text-stone-400">Host Photo</span>
              </div>
              <div className="aspect-[3/4] bg-stone-200 rounded-2xl flex items-center justify-center mt-8">
                <span className="text-stone-400">Host Photo</span>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-20 bg-white">
          <div className="section-padding max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-stone-500 text-sm tracking-widest uppercase mb-4 block">What We Offer</span>
              <h2 className="font-display text-4xl text-stone-900">The Big 14 Experience</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-stone-900" />
                </div>
                <h3 className="font-display text-xl text-stone-900 mb-2">Boutique Comfort</h3>
                <p className="text-stone-600">
                  A private, self-contained space with all the amenities you need for a comfortable stay.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-8 h-8 text-stone-900" />
                </div>
                <h3 className="font-display text-xl text-stone-900 mb-2">Local Insights</h3>
                <p className="text-stone-600">
                  Get our personal recommendations for the best restaurants, cafes, and hidden gems in Randburg.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-stone-900" />
                </div>
                <h3 className="font-display text-xl text-stone-900 mb-2">Personal Touch</h3>
                <p className="text-stone-600">
                  We're always just a message away. Need something? Just ask. We go the extra mile for our guests.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-stone-900" />
                </div>
                <h3 className="font-display text-xl text-stone-900 mb-2">Spotless Clean</h3>
                <p className="text-stone-600">
                  Impeccable cleanliness is our standard. Every stay starts with a fresh, thoroughly cleaned space.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Space */}
        <section className="py-20 section-padding max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="aspect-[4/3] bg-stone-200 rounded-3xl flex items-center justify-center">
                <span className="text-stone-400">Property Image</span>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-stone-500 text-sm tracking-widest uppercase mb-4 block">The Space</span>
              <h2 className="font-display text-4xl text-stone-900 mb-6">Your Home in Randburg</h2>
              <div className="space-y-4 text-stone-600 text-lg leading-relaxed">
                <p>
                  Big 14 is more than just a place to sleep — it's a carefully curated space designed 
                  for relaxation and comfort. Located in the heart of Ferndale, Randburg, our guest house 
                  offers the perfect blend of suburban tranquility and urban convenience.
                </p>
                <p>
                  Whether you're here for business, visiting family, or exploring Johannesburg as a tourist, 
                  you'll find everything you need: a cozy bedroom with premium linens, a modern bathroom, 
                  a fully equipped kitchen, and inviting living spaces. The outdoor patio is perfect for 
                  morning coffee or evening relaxation.
                </p>
                <p>
                  We're proud to offer a space that feels like home — because that's exactly what we want 
                  you to feel: at home.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Perfect For */}
        <section className="py-20 bg-stone-900 text-white">
          <div className="section-padding max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-white/60 text-sm tracking-widest uppercase mb-4 block">Perfect For</span>
              <h2 className="font-display text-4xl">Who We Host</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 p-8 rounded-3xl">
                <h3 className="font-display text-2xl mb-4">Business Travelers</h3>
                <p className="text-white/80">
                  Reliable WiFi, a comfortable workspace, and easy access to Sandton and Johannesburg CBD. 
                  Perfect for professionals who need a quiet, comfortable base.
                </p>
              </div>

              <div className="bg-white/10 p-8 rounded-3xl">
                <h3 className="font-display text-2xl mb-4">Couples</h3>
                <p className="text-white/80">
                  An intimate, private space ideal for romantic getaways or weekend escapes. 
                  Enjoy the peace and quiet of our neighborhood.
                </p>
              </div>

              <div className="bg-white/10 p-8 rounded-3xl">
                <h3 className="font-display text-2xl mb-4">Solo Adventurers</h3>
                <p className="text-white/80">
                  Safe, secure, and centrally located. Whether you're exploring Joburg or just 
                  passing through, you'll find a welcoming space here.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 section-padding max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl text-stone-900 mb-6">Ready to Experience Big 14?</h2>
          <p className="text-stone-600 text-lg mb-8">
            We'd love to host you. Check availability and book your stay today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn-primary">
              Check Availability
            </Link>
            <Link href="/contact" className="px-8 py-4 border-2 border-stone-900 rounded-full font-semibold hover:bg-stone-100 transition-colors">
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-12">
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <span className="text-stone-900 font-display text-sm font-bold">B14</span>
                </div>
                <span className="font-display text-xl">Big 14</span>
              </div>
              <p className="text-white/60">Your boutique home in Randburg</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/60">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/book" className="hover:text-white">Book Now</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/60">
                <li>+27 63 900 1897</li>
                <li>hello@big14.co.za</li>
                <li>Ferndale, Randburg</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <p className="text-white/60">@big14guesthouse</p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/40">
            <p>© 2024 Big 14 Guest House. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
