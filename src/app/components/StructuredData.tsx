import { propertyDetails, livePlatforms, formatPhone } from '@/lib/property';
import { siteUrl } from '@/lib/site';

/**
 * schema.org LodgingBusiness markup. This is what lets Google show the
 * property as a place — rating, price range, location — rather than as a
 * generic web page.
 */
export default function StructuredData() {
  const { name, description, location, contact, specs, pricing, amenities, stay } =
    propertyDetails;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${siteUrl}/#lodging`,
    name,
    description: description.split('\n')[0],
    url: `${siteUrl}/`,
    image: [
      `${siteUrl}/images/exterior.jpg`,
      `${siteUrl}/images/bedroom.jpg`,
      `${siteUrl}/images/living-room.jpg`,
    ],
    logo: `${siteUrl}/images/big14_logo.png`,
    telephone: formatPhone(contact.whatsapp).replace(/\s/g, ''),
    email: contact.email,
    priceRange: `ZAR ${pricing.baseRate} per night`,
    currenciesAccepted: 'ZAR',
    numberOfRooms: specs.bedrooms,
    checkinTime: stay.checkInFrom,
    checkoutTime: stay.checkOutBy,
    petsAllowed: false,
    smokingAllowed: false,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.neighborhood,
      addressRegion: location.region,
      postalCode: location.postalCode,
      addressCountry: 'ZA',
    },
    amenityFeature: amenities.map((a) => ({
      '@type': 'LocationFeatureSpecification',
      name: a.label,
      value: true,
    })),
    // Listings on the platforms guests can book through.
    sameAs: livePlatforms.map((p) => p.url),
  };

  return (
    <script
      type="application/ld+json"
      // The payload is built from our own constants, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
