'use client';

import { propertyDetails } from '@/lib/property';
import { Star, MapPin, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-cream">
      {/* Fun background shapes */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-sunshine/30 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-coral/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-sage/20 rounded-full blur-2xl" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center section-padding py-20 lg:py-0">
        {/* Left: Text */}
        <div className="flex-1 text-center lg:text-left pt-10 lg:pt-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-sunshine" />
            <span className="text-sm font-semibold text-charcoal">5.0 Guest Rating ⭐</span>
          </div>
          
          {/* Title */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-charcoal mb-6 leading-tight">
            Welcome to
            <span className="block gradient-text">{propertyDetails.name}</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-warm-gray mb-8 max-w-xl mx-auto lg:mx-0">
            Your cozy home away from home in Randburg, Johannesburg. 
            Perfect for couples, business travelers & solo adventurers! ✨
          </p>
          
          {/* Location pill */}
          <div className="inline-flex items-center gap-2 bg-sand px-5 py-3 rounded-full mb-10">
            <MapPin className="w-5 h-5 text-coral" />
            <span className="font-medium">{propertyDetails.location.neighborhood}, Johannesburg</span>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="#book" className="btn-primary text-lg">
              Check Availability 🗓️
            </a>
            <a href="#about" className="btn-secondary text-lg">
              Take a Tour 🏠
            </a>
          </div>
          
          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-12 justify-center lg:justify-start text-sm text-warm-gray">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sage rounded-full" />
              <span>Superhost</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-coral rounded-full" />
              <span>Instant Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sky rounded-full" />
              <span>Free Cancellation</span>
            </div>
          </div>
        </div>
        
        {/* Right: Image area */}
        <div className="flex-1 flex justify-center lg:justify-end mt-12 lg:mt-0">
          <div className="relative">
            {/* Main image placeholder with blob shape */}
            <div className="w-80 h-80 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-sand blob flex items-center justify-center relative z-10">
              <span className="text-warm-gray text-lg">🏡 Property Photo</span>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -left-8 top-10 bg-white p-4 rounded-2xl shadow-lg z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-coral-light rounded-full flex items-center justify-center">
                  <span className="text-coral text-xl">🛏️</span>
                </div>
                <div>
                  <p className="font-bold text-charcoal">1 Bedroom</p>
                  <p className="text-sm text-warm-gray">Cozy & private</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -right-4 bottom-20 bg-white p-4 rounded-2xl shadow-lg z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sage-light rounded-full flex items-center justify-center">
                  <span className="text-sage text-xl">👥</span>
                </div>
                <div>
                  <p className="font-bold text-charcoal">2 Guests</p>
                  <p className="text-sm text-warm-gray">Perfect for couples</p>
                </div>
              </div>
            </div>
            
            {/* Price tag */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-charcoal text-white px-6 py-3 rounded-full z-20">
              <p className="font-bold text-lg">From R{propertyDetails.pricing.baseRate}/night</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
