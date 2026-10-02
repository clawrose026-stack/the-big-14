import type { Metadata } from 'next';
import DocPage from '../components/DocPage';
import { propertyDetails, formatPhone, whatsappLink } from '@/lib/property';
import { siteUrl } from '@/lib/site';
import { Plus } from 'lucide-react';

const slug = (text: string) =>
  text.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about staying at The Big 14 in Randburg — check-in, parking, WiFi, the area, payment and cancellation.',
  alternates: { canonical: '/faq/' },
};

const { contact, specs, pricing, location, stay, ratings } = propertyDetails;

/**
 * Questions and answers, kept as data so the page and its FAQPage structured
 * data can never drift apart. Answers are plain text for the same reason.
 */
const categories = [
  'Booking & payment',
  'Your stay',
  'The property',
  'Location',
] as const;

type Faq = { category: (typeof categories)[number]; q: string; a: string };

const faqs: Faq[] = [
  {
    category: 'Booking & payment',
    q: 'How do I book?',
    a: `Through Airbnb, Booking.com or LekkeSlaap — whichever you already have an account with. We do not take bookings directly on this website, so you always have the platform's payment protection and dispute process behind you.`,
  },
  {
    category: 'Booking & payment',
    q: 'What do previous guests say?',
    a: `We are an Airbnb Superhost rated ${ratings.airbnb.score} out of ${ratings.airbnb.outOf} from ${ratings.airbnb.reviews} reviews, and rated ${ratings.bookingCom.label} ${ratings.bookingCom.score} on Booking.com. You can read every review on the listings themselves.`,
  },
  {
    category: 'Booking & payment',
    q: 'Why can I not book directly on this site?',
    a: 'Direct booking is not live yet. Until it is, booking through a platform means your payment is protected and your cancellation terms are clear. The links on our homepage go straight to our listings.',
  },
  {
    category: 'Your stay',
    q: 'What time is check-in and check-out?',
    a: `Check-in is between ${stay.checkInFrom} and ${stay.checkInUntil}, and check-out is by ${stay.checkOutBy}. We send arrival instructions and the full address by WhatsApp before you arrive. Arriving after ${stay.checkInUntil}? Let us know in advance and we will make a plan.`,
  },
  {
    category: 'Your stay',
    q: 'Can I check in early or check out late?',
    a: 'Often, yes, and usually at no charge if the property is free either side of your stay. Ask us ahead of time rather than on the day, because the space may be mid-turnaround between guests.',
  },
  {
    category: 'Your stay',
    q: 'How many people can stay?',
    a: `The property sleeps ${specs.maxGuests}, including children and infants. It is a single open-plan unit with a ${specs.bedType.toLowerCase()}, a kitchenette and dining area, and a private bathroom with a shower. Everyone staying overnight needs to be named on the booking.`,
  },
  {
    category: 'The property',
    q: 'Is parking available?',
    a: `Yes — free, secure, on-site parking for ${stay.parkingSpaces === 1 ? 'one vehicle' : `${stay.parkingSpaces} vehicles`}. If you are arriving with more than that, message us first so we can tell you what is possible.`,
  },
  {
    category: 'The property',
    q: 'Is there WiFi?',
    a: 'Yes, high-speed WiFi, included in the rate. There is also a work desk, and the WiFi stays on through load-shedding thanks to the backup generator, so it is a dependable place to work from.',
  },
  {
    category: 'The property',
    q: 'What happens during load-shedding?',
    a: 'Very little. The property has a backup generator that keeps the lights, WiFi and essentials running. During an outage please avoid running the stove, air-conditioning and washing machine all at once, so the generator is not overloaded.',
  },
  {
    category: 'The property',
    q: 'Is the property suitable for working remotely?',
    a: 'Yes. There is a dedicated work desk, fast WiFi with generator backup, and a quiet residential setting. If you need a particular monitor or chair setup, ask before booking and we will tell you honestly whether it will suit you.',
  },
  {
    category: 'Your stay',
    q: 'Can I smoke?',
    a: 'No. The property is entirely non-smoking, indoors and outdoors, and that includes vaping. Evidence of smoking means a charge for the specialist clean required to remove the smell.',
  },
  {
    category: 'Your stay',
    q: 'Are pets allowed?',
    a: 'Unfortunately not.',
  },
  {
    category: 'Your stay',
    q: 'Can I have visitors?',
    a: 'Day visitors are fine within reason — please let us know in advance and keep to the 22:00 to 07:00 quiet hours. Parties and events are not permitted under any circumstances.',
  },
  {
    category: 'The property',
    q: 'What is included in the rate?',
    a: 'Bed linen, bath towels and essential toiletries; WiFi; parking; air-conditioning; a smart TV with DStv and Netflix; a kitchenette with an electric stove, microwave, fridge-freezer, air fryer, kettle and toaster; tea and coffee, milk and bottled water; a washing machine; and the garden, patio and private charcoal braai. The exact rate and any cleaning fee depend on the platform and your dates.',
  },
  {
    category: 'The property',
    q: 'Can I cook?',
    a: 'Yes. The kitchenette has an electric stove, microwave, air fryer, fridge-freezer, kettle, toaster and basic cookware, with a dining table for two. There is also a private charcoal braai in the garden — bring your own charcoal and firelighters.',
  },
  {
    category: 'Booking & payment',
    q: 'How much does it cost?',
    a: `Rates start from around R${pricing.baseRate} per night and vary by season and length of stay. The live price for your dates is always the one shown on the platform you are booking through — that is the figure that counts.`,
  },
  {
    category: 'Booking & payment',
    q: 'How do I pay?',
    a: 'You pay the platform you book through, using whatever methods they support. We never ask for payment by bank transfer, cash or any method outside the platform. If anyone claiming to be us asks you to do that, it is a scam — please tell us immediately.',
  },
  {
    category: 'Booking & payment',
    q: 'What is the cancellation policy?',
    a: 'It is set by the platform you booked through and differs between them, so check the terms shown at the time of booking. Our cancellation policy page explains how it works and how to cancel.',
  },
  {
    category: 'Location',
    q: 'Where exactly is the property?',
    a: `In ${location.suburb}, ${location.neighborhood}, ${location.city} ${location.postalCode}. The full street address is sent once your booking is confirmed — standard practice on every platform, for the security of the property and of guests.`,
  },
  {
    category: 'Location',
    q: 'Is the area safe?',
    a: 'It is a quiet residential area and the property is secure, with controlled access and on-site parking. As anywhere in Johannesburg, we recommend the usual sense: lock up when you go out, do not leave valuables visible in your car, and use a ride-hailing app rather than walking late at night.',
  },
  {
    category: 'Location',
    q: 'What is nearby?',
    a: 'Randburg has shopping centres, restaurants and supermarkets a short drive away. Further afield, Parkview Golf Club, the Apartheid Museum and Gold Reef City are all within easy reach by car. We are happy to send personal recommendations — just ask once you have booked.',
  },
  {
    category: 'Location',
    q: 'How do I get there from the airport?',
    a: 'Lanseria International is the closer airport, about 29 km away. OR Tambo International is further — allow 40 to 60 minutes depending on traffic. Uber and Bolt both operate reliably from each. There is no direct public transport to the property, so a car or ride-hailing app is the way to get around.',
  },
  {
    category: 'The property',
    q: 'Is the property accessible?',
    a: 'Please read our accessibility page for a frank description of the space, or message us with your specific requirements before booking. We would rather tell you honestly that we are not suitable than have you arrive to a property that does not work for you.',
  },
  {
    category: 'Your stay',
    q: 'What if something goes wrong during my stay?',
    a: `Message us straight away on WhatsApp at ${formatPhone(contact.whatsapp)}. Most issues take minutes to resolve while you are still here. We would much rather fix something during your stay than read about it afterwards.`,
  },
  {
    category: 'Booking & payment',
    q: 'Do you have a minimum stay?',
    a: `The minimum is ${pricing.minimumNights} night, though some dates and platforms may apply a longer minimum. The booking platform will tell you when you select your dates.`,
  },
];

export default function FaqPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteUrl}/faq/#faq`,
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Built from the same `faqs` constant the page renders.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <DocPage
        eyebrow="Guest Information"
        title="Frequently Asked Questions"
        intro="The questions guests ask most often, answered properly. If yours is not here, message us — we reply quickly."
        updated="2026-10-02"
        current="/faq"
      >
        <nav aria-label="FAQ sections" className="!mt-0">
          <ul className="flex flex-wrap gap-2 !list-none !pl-0">
            {categories.map((category) => (
              <li key={category} className="!mt-0">
                <a
                  href={`#${slug(category)}`}
                  className="inline-flex px-4 py-2 rounded-full bg-white ring-1 ring-stone-900/10 text-sm !font-medium !no-underline text-stone-700 hover:bg-stone-900 hover:!text-white transition-colors"
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {categories.map((category) => (
          <section key={category} aria-labelledby={slug(category)}>
            <h2 id={slug(category)} className="scroll-mt-28">
              {category}
            </h2>
            <div className="mt-5 divide-y divide-stone-200 border-y border-stone-200">
              {faqs
                .filter((faq) => faq.category === category)
                .map(({ q, a }) => (
                  <details key={q} className="faq-item group">
                    <summary>
                      <span>{q}</span>
                      <Plus
                        className="w-5 h-5 shrink-0 text-stone-400 transition-transform duration-300 group-open:rotate-45"
                        aria-hidden
                      />
                    </summary>
                    <p>{a}</p>
                  </details>
                ))}
            </div>
          </section>
        ))}

        <div className="callout">
          <p>
            <strong>Still have a question?</strong> WhatsApp us on{' '}
            <a
              href={whatsappLink(contact.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {formatPhone(contact.whatsapp)}
            </a>{' '}
            or email{' '}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>. You do not
            need a booking to ask.
          </p>
        </div>
      </DocPage>
    </>
  );
}
