export const propertyDetails = {
  name: "The Big 14",
  tagline: "Your Premium Urban Retreat in Randburg",
  location: {
    address: "Randburg, Johannesburg, South Africa",
    /** The suburb, as all three platforms list it. */
    suburb: "Greymont",
    neighborhood: "Randburg",
    city: "Johannesburg",
    region: "Gauteng",
    postalCode: "2195",
    country: "South Africa"
    // The street address is deliberately not published here — it is sent to
    // guests once a booking is confirmed, as the platforms do.
  },
  specs: {
    bedrooms: 1,
    beds: 1,
    bedType: "Queen bed",
    bathrooms: 1,
    maxGuests: 2,
    propertyType: "Guesthouse"
  },
  pricing: {
    baseRate: 730,
    cleaningFee: 50,
    minimumNights: 1
  },
  /**
   * Stay times and rules. Matches the Airbnb, Booking.com and LekkeSlaap
   * listings as of October 2026 — change them there and here together.
   */
  stay: {
    checkInFrom: "14:00",
    checkInUntil: "20:00",
    checkOutBy: "10:00",
    quietHoursFrom: "22:00",
    quietHoursUntil: "07:00",
    parkingSpaces: 1
  },
  contact: {
    whatsapp: "0639001897",
    email: "thebigfourteen03@gmail.com"
  },
  /**
   * Ratings as published by each platform. Review these when they change —
   * the site must never claim a better score than the platform shows.
   */
  ratings: {
    asOf: "2026-10-03",
    airbnb: { score: 4.96, outOf: 5, reviews: 46, superhost: true },
    bookingCom: { score: 9.3, outOf: 10, label: "Superb", reviews: 6 }
  },
  amenities: [
    { icon: "Wifi", label: "High-Speed WiFi" },
    { icon: "Zap", label: "Backup Generator" },
    { icon: "Car", label: "Free On-Site Parking" },
    { icon: "Snowflake", label: "Air Conditioning" },
    { icon: "Tv", label: "Smart TV · DStv & Netflix" },
    { icon: "CookingPot", label: "Equipped Kitchenette" },
    { icon: "Flame", label: "Private Braai" },
    { icon: "Trees", label: "Garden & Patio" },
    { icon: "WashingMachine", label: "Washing Machine" },
    { icon: "Laptop", label: "Work Desk" },
    { icon: "Moon", label: "Quality Linens" },
    { icon: "Shield", label: "Secure Property" }
  ],
  description: `Welcome to The Big 14 — a thoughtfully designed guesthouse that combines urban convenience with boutique comfort. Located in Randburg, Johannesburg, our space offers a perfect retreat for business travellers, couples, or solo adventurers.

The space features a queen bedroom with premium bedding, a private bathroom with all essentials, a kitchenette and a private garden with a braai. A backup generator keeps the lights on through load-shedding.`,
  highlights: [
    "Airbnb Superhost",
    "4.96★ from 46 Airbnb reviews",
    "Rated Superb 9.3 on Booking.com",
    "Backup generator for load-shedding",
    "Free on-site parking",
    "Local recommendations"
  ]
}

/**
 * Where guests can book. This is the single source of truth — the booking
 * section, the footer and the contact section all render from this list.
 *
 * `url` must point at the property's own listing page, not a marketplace
 * homepage. Set `url` to null to hide a platform until its listing is live.
 */
export type BookingPlatform = {
  id: string;
  name: string;
  url: string | null;
  description: string;
};

export const bookingPlatforms: BookingPlatform[] = [
  {
    id: 'airbnb',
    name: 'Airbnb',
    url: 'https://www.airbnb.com/rooms/1591430106686520580',
    description: 'Superhost · 4.96★ from 46 reviews',
  },
  {
    id: 'booking-com',
    name: 'Booking.com',
    url: 'https://www.booking.com/hotel/za/big-14-guesthouse-randburg-johannesburg.html',
    description: 'Rated Superb 9.3 · free cancellation available',
  },
  {
    id: 'lekkeslaap',
    name: 'LekkeSlaap',
    url: 'https://www.lekkeslaap.co.za/akkommodasie/big-14',
    description: "South Africa's own stay marketplace · free cancellation available",
  }
];

/** Only the platforms that have a live listing to link to. */
export const livePlatforms = bookingPlatforms.filter(
  (p): p is BookingPlatform & { url: string } => Boolean(p.url)
);

/** Local number "0639001897" -> "+27 63 900 1897" for display. */
export function formatPhone(local: string) {
  const digits = local.replace(/\D/g, '').replace(/^0/, '');
  const groups = digits.match(/^(\d{2})(\d{3})(\d{4})$/);
  return groups ? `+27 ${groups[1]} ${groups[2]} ${groups[3]}` : `+27 ${digits}`;
}

/** WhatsApp deep link for the property's number. */
export function whatsappLink(local: string) {
  return `https://wa.me/27${local.replace(/\D/g, '').replace(/^0/, '')}`;
}
