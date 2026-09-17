import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import { ChevronLeft, Heart, Coffee, Home, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | The Big 14 Guesthouse, Randburg',
  description:
    'Meet your hosts and discover the story behind The Big 14 — a boutique guesthouse in Ferndale, Randburg.',
};

const offerings = [
  {
    icon: Home,
    title: 'Boutique Comfort',
    body: 'A private, self-contained space with all the amenities you need for a comfortable stay.',
  },
  {
    icon: Coffee,
    title: 'Local Insights',
    body: 'Get our personal recommendations for the best restaurants, cafes, and hidden gems in Randburg.',
  },
  {
    icon: Heart,
    title: 'Personal Touch',
    body: "We're always just a message away. Need something? Just ask. We go the extra mile for our guests.",
  },
  {
    icon: Sparkles,
    title: 'Spotless Clean',
    body: 'Impeccable cleanliness is our standard. Every stay starts with a fresh, thoroughly cleaned space.',
  },
];

const guests = [
  {
    title: 'Business Travellers',
    body: 'Reliable WiFi, a comfortable workspace, and easy access to Sandton and Johannesburg CBD. Perfect for professionals who need a quiet, comfortable base.',
  },
  {
    title: 'Couples',
    body: 'An intimate, private space ideal for romantic getaways or weekend escapes. Enjoy the peace and quiet of our neighbourhood.',
  },
  {
    title: 'Solo Adventurers',
    body: "Safe, secure, and centrally located. Whether you're exploring Joburg or just passing through, you'll find a welcoming space here.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <main id="main">
        {/* Hero Section */}
        <section className="on-dark bg-stone-900 text-white py-20 lg:py-24">
          <div className="section-padding max-w-4xl mx-auto text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-6 animate-rise">
              Welcome to The Big 14
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed animate-rise [animation-delay:100ms]">
              A boutique guesthouse experience crafted with care, comfort, and a
              personal touch.
            </p>
          </div>
        </section>

        {/* Hosts Section */}
        <section className="py-20 lg:py-24 section-padding max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <span className="eyebrow mb-4">Your Hosts</span>
              <h2 className="font-display text-3xl lg:text-4xl text-stone-900 mb-6">
                The people behind the stay
              </h2>
              <div className="space-y-4 text-stone-600 text-lg leading-relaxed">
                <p>
                  We&apos;re a young couple who fell in love with the idea of
                  creating a home away from home for travellers visiting
                  Johannesburg. What started as a simple spare room has grown
                  into The Big 14 — a thoughtfully designed guesthouse that
                  reflects our passion for hospitality and attention to detail.
                </p>
                <p>
                  When we&apos;re not hosting guests, you&apos;ll find us
                  exploring the best coffee spots in Randburg, hiking local
                  trails, or planning our next adventure. We understand what
                  travellers need because we&apos;re travellers ourselves.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-200">
                <Image
                  src="/images/living-room.jpg"
                  alt="The living room at The Big 14"
                  fill
                  sizes="(max-width: 768px) 45vw, 280px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-200 mt-8">
                <Image
                  src="/images/patio.jpg"
                  alt="The private patio at The Big 14"
                  fill
                  sizes="(max-width: 768px) 45vw, 280px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-20 lg:py-24 bg-stone-50">
          <div className="section-padding max-w-6xl mx-auto">
            <Reveal className="text-center mb-14 max-w-2xl mx-auto">
              <span className="eyebrow mb-4">What We Offer</span>
              <h2 className="font-display text-3xl lg:text-4xl text-stone-900">
                The Big 14 Experience
              </h2>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {offerings.map((item, index) => (
                <Reveal key={item.title} delay={index * 80}>
                  <div className="h-full bg-white rounded-2xl p-7 ring-1 ring-stone-900/5 hover:shadow-[0_24px_48px_-32px_rgba(28,25,23,0.6)] transition-shadow duration-300">
                    <div className="w-12 h-12 bg-stone-900 rounded-xl flex items-center justify-center mb-5">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-display text-lg text-stone-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-stone-600 text-[0.9375rem] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* The Space */}
        <section className="py-20 lg:py-24 section-padding max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal className="order-2 md:order-1">
              <div className="relative aspect-[4/3] rounded-[1.75rem] overflow-hidden bg-stone-200 shadow-[0_30px_60px_-35px_rgba(28,25,23,0.55)]">
                <Image
                  src="/images/bedroom.jpg"
                  alt="The bedroom at The Big 14"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={100} className="order-1 md:order-2">
              <span className="eyebrow mb-4">The Space</span>
              <h2 className="font-display text-3xl lg:text-4xl text-stone-900 mb-6">
                Your Home in Randburg
              </h2>
              <div className="space-y-4 text-stone-600 text-lg leading-relaxed">
                <p>
                  The Big 14 is more than just a place to sleep — it&apos;s a
                  carefully curated space designed for relaxation and comfort.
                  Located in the heart of Ferndale, Randburg, our guesthouse
                  offers the perfect blend of suburban tranquillity and urban
                  convenience.
                </p>
                <p>
                  Whether you&apos;re here for business, visiting family, or
                  exploring Johannesburg as a tourist, you&apos;ll find
                  everything you need: a cosy bedroom with premium linens, a
                  modern bathroom, a fully equipped kitchen, and inviting living
                  spaces. The outdoor patio is perfect for morning coffee or
                  evening relaxation.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Perfect For */}
        <section className="on-dark py-20 lg:py-24 bg-stone-900 text-white">
          <div className="section-padding max-w-6xl mx-auto">
            <Reveal className="text-center mb-14">
              <span className="eyebrow mb-4 !text-stone-400">Perfect For</span>
              <h2 className="font-display text-3xl lg:text-4xl">Who We Host</h2>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-5">
              {guests.map((guest, index) => (
                <Reveal key={guest.title} delay={index * 90}>
                  <div className="h-full bg-white/5 hover:bg-white/10 transition-colors p-8 rounded-3xl">
                    <h3 className="font-display text-xl mb-3">{guest.title}</h3>
                    <p className="text-white/70 leading-relaxed">{guest.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-24 section-padding max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="font-display text-3xl lg:text-4xl text-stone-900 mb-5">
              Ready to Experience The Big 14?
            </h2>
            <p className="text-stone-600 text-lg mb-9">
              We&apos;d love to host you. Book your stay through your preferred
              platform today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/#booking-platforms" className="btn-primary">
                Book Your Stay
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
