'use client';

import { useState } from 'react';
import { track } from '@vercel/analytics';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { propertyDetails, formatPhone, whatsappLink } from '@/lib/property';
import { MapPin, Phone, Mail, Clock, Send, ChevronLeft, Loader2, AlertCircle } from 'lucide-react';

const { contact, location, stay } = propertyDetails;

// A suburb-level search, never the street address — that is sent on booking.
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${location.suburb}, ${location.neighborhood}, ${location.city}`
)}`;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Hidden from people, filled by bots — see the honeypot check in the route.
  const [company, setCompany] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    setError(null);

    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, company }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      track('contact_form_sent', { subject: formData.subject });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(true);
    } catch {
      setError(
        'We could not reach the server. Please check your connection, or WhatsApp us instead.'
      );
    } finally {
      setSending(false);
    }
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
                      {location.suburb}, {location.neighborhood}
                      <br />
                      {location.city} {location.postalCode}, {location.country}
                    </p>
                    <p className="text-stone-500 text-sm mt-1">
                      Full address sent once your booking is confirmed.
                    </p>
                  </div>
                </div>

                <a
                  href={whatsappLink(contact.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp_click"
                  data-section="contact_page"
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
                    <p className="text-stone-600">
                      Check-in: {stay.checkInFrom} – {stay.checkInUntil}
                    </p>
                    <p className="text-stone-600">Check-out: by {stay.checkOutBy}</p>
                  </div>
                </div>
              </div>

              {/* Getting here */}
              <div className="mt-10 bg-white ring-1 ring-stone-900/5 rounded-2xl p-5 sm:p-6">
                <h2 className="font-semibold text-stone-900 mb-4">Getting here</h2>
                <ul className="space-y-2.5 text-[0.9375rem] text-stone-600">
                  <li className="flex justify-between gap-4">
                    <span>Lanseria International Airport</span>
                    <span className="text-stone-900 font-medium tabular-nums shrink-0">~29 km</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>OR Tambo International Airport</span>
                    <span className="text-stone-900 font-medium shrink-0">40–60 min</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>Getting around</span>
                    <span className="text-stone-900 font-medium shrink-0">Car, Uber or Bolt</span>
                  </li>
                </ul>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors"
                >
                  <MapPin className="w-4 h-4" aria-hidden />
                  View {location.suburb} on Google Maps
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
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
                    onClick={() => {
                      setSubmitted(false);
                      setError(null);
                    }}
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
                    Fill out the form below and we&apos;ll reply as soon as we
                    can. For anything urgent, WhatsApp is quickest.
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

                    {/* Honeypot — visually hidden, never announced, never tabbable. */}
                    <div className="hidden" aria-hidden>
                      <label htmlFor="company">Company</label>
                      <input
                        id="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>

                    {error && (
                      <p
                        role="alert"
                        className="flex items-start gap-2.5 text-sm text-red-700 bg-red-50 ring-1 ring-red-200 rounded-xl px-4 py-3"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden />
                        <span>{error}</span>
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-primary w-full !py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {sending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" aria-hidden /> Send Message
                        </>
                      )}
                    </button>

                    <p className="text-xs text-stone-500 text-center leading-relaxed">
                      We use your details only to reply to you. See our{' '}
                      <Link href="/privacy" className="underline underline-offset-2 hover:text-stone-900">
                        privacy policy
                      </Link>
                      .
                    </p>
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
