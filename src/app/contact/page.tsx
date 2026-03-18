'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import { MapPin, Phone, Mail, Clock, Send, ChevronLeft } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Email sending will be set up later
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-stone-100">
      <Header />

      <main className="section-padding max-w-6xl mx-auto py-12">
        <Link href="/" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-8">
          <ChevronLeft className="w-5 h-5" /> Back to Home
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h1 className="font-display text-4xl text-stone-900 mb-4">Get in Touch</h1>
            <p className="text-stone-600 mb-8 text-lg">
              Have questions about your stay? We're here to help make your visit to Randburg unforgettable.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900">Location</h3>
                  <p className="text-stone-600">14 The Straight Avenue<br />Ferndale, Randburg<br />Johannesburg, South Africa</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900">Phone</h3>
                  <p className="text-stone-600">+27 63 900 1897</p>
                  <p className="text-stone-500 text-sm">WhatsApp available</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900">Email</h3>
                  <p className="text-stone-600">hello@big14.co.za</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900">Check-in / Check-out</h3>
                  <p className="text-stone-600">Check-in: 2:00 PM</p>
                  <p className="text-stone-600">Check-out: 11:00 AM</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 aspect-video bg-stone-200 rounded-3xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <p className="text-stone-500">Map integration coming soon</p>
                <p className="text-stone-400 text-sm">14 The Straight Avenue, Ferndale, Randburg</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-lg h-fit">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="font-display text-2xl text-stone-900 mb-2">Message Sent!</h2>
                <p className="text-stone-600 mb-6">Thank you for reaching out. We'll get back to you soon.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl text-stone-900 mb-2">Send us a Message</h2>
                <p className="text-stone-600 mb-6">Fill out the form below and we'll respond within 24 hours.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:border-stone-900 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:border-stone-900 focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:border-stone-900 focus:outline-none"
                      placeholder="+27 63 900 1897"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Subject *</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:border-stone-900 focus:outline-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="availability">Check Availability</option>
                      <option value="special">Special Request</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Message *</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:border-stone-900 focus:outline-none h-32 resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" /> Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-8">
        <div className="section-padding max-w-7xl mx-auto text-center">
          <p className="text-white/60">© 2024 Big 14 Guest House. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
