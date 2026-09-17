'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { propertyDetails, formatPhone, whatsappLink } from '@/lib/property';
import { MapPin, Phone, Mail, Clock, Send, ChevronLeft } from 'lucide-react';

const { contact } = propertyDetails;

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
    <>
      <Header />

      <main id="main" className="bg-stone-50">
        <div className="section-padding max-w-6xl mx-auto py-12 lg:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 transition-colors mb-10"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="animate-rise">
              <span className="eyebrow mb-4">Contact</span>
              <h1 className="font-display text-4xl lg:text-5xl text-stone-900 mb-5">
                Get in Touch
              </h1>
              <p className="text-stone-600 mb-10 text-lg leading-relaxed max-w-md">
                Have questions about your stay? We&apos;re here to help make your
                visit to Randburg unforgettable.
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-4 p-4 -mx-4 rounded-2xl">
                  <div className="w-11 h-11 bg-stone-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-stone-900">Location</h2>
                    <p className="text-stone-600">
                      14 The Straight Avenue
                      <br />
                      Ferndale, Randburg
                      <br />
                      Johannesburg, South Africa
                    </p>
                  </div>
                </div>

                <a
                  href={whatsappLink(contact.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-4 -mx-4 rounded-2xl hover:bg-stone-100 transition-colors"
                >
                  <div className="w-11 h-11 bg-stone-900 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-stone-900">Phone</h2>
                    <p className="text-stone-600">
                      {formatPhone(contact.whatsapp)}
                    </p>
                    <p className="text-stone-500 text-sm">WhatsApp available</p>
                  </div>
                </a>

                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-start gap-4 p-4 -mx-4 rounded-2xl hover:bg-stone-100 transition-colors"
                >
                  <div className="w-11 h-11 bg-stone-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-semibold text-stone-900">Email</h2>
                    <p className="text-stone-600 break-all">{contact.email}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 -mx-4 rounded-2xl">
                  <div className="w-11 h-11 bg-stone-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-stone-900">
                      Check-in / Check-out
                    </h2>
                    <p className="text-stone-600">Check-in: 2:00 PM</p>
                    <p className="text-stone-600">Check-out: 11:00 AM</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder — kept compact until a real map is wired up. */}
              <div className="mt-10 bg-white border border-dashed border-stone-300 rounded-2xl px-5 py-6 flex items-center gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-stone-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-stone-400" />
                </div>
                <div>
                  <p className="text-stone-700 font-medium text-[0.9375rem]">
                    14 The Straight Avenue, Ferndale
                  </p>
                  <p className="text-stone-400 text-sm">
                    Interactive map coming soon
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl ring-1 ring-stone-900/5 shadow-[0_24px_60px_-40px_rgba(28,25,23,0.5)] h-fit lg:sticky lg:top-28 animate-rise [animation-delay:120ms]">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Send className="w-7 h-7 text-green-600" />
                  </div>
                  <h2 className="font-display text-2xl text-stone-900 mb-2">
                    Message Sent
                  </h2>
                  <p className="text-stone-600 mb-8">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl text-stone-900 mb-2">
                    Send us a Message
                  </h2>
                  <p className="text-stone-500 mb-7 text-[0.9375rem]">
                    Fill out the form below and we&apos;ll respond within 24
                    hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-stone-700 mb-2"
                      >
                        Your Name <span className="text-stone-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="field"
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-stone-700 mb-2"
                      >
                        Email Address <span className="text-stone-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="field"
                        placeholder="jane@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-stone-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="field"
                        placeholder="+27 82 000 0000"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-stone-700 mb-2"
                      >
                        Subject <span className="text-stone-400">*</span>
                      </label>
                      <select
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="field"
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
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-stone-700 mb-2"
                      >
                        Message <span className="text-stone-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="field h-32 resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full !py-4"
                    >
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
