export const propertyDetails = {
  name: "The Big 14",
  tagline: "Your Premium Urban Retreat in Randburg",
  location: {
    address: "Randburg, Johannesburg, South Africa",
    neighborhood: "Randburg",
    city: "Johannesburg",
    country: "South Africa"
  },
  specs: {
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    propertyType: "Guesthouse"
  },
  pricing: {
    baseRate: 730,
    cleaningFee: 50,
    minimumNights: 1
  },
  contact: {
    whatsapp: "0639001897",
    email: "thebigfourteen03@gmail.com",
    instagram: "#",
    facebook: "#"
  },
  amenities: [
    { icon: "Wifi", label: "High-Speed WiFi" },
    { icon: "Car", label: "Free Parking" },
    { icon: "Snowflake", label: "Air Conditioning" },
    { icon: "Tv", label: "Smart TV" },
    { icon: "Coffee", label: "Coffee Machine" },
    { icon: "Droplet", label: "Hot Water" },
    { icon: "Shield", label: "Secure Property" },
    { icon: "Moon", label: "Quality Linens" }
  ],
  description: `Welcome to The Big 14 — a thoughtfully designed guesthouse that combines urban convenience with boutique comfort. Located in the heart of Randburg, Johannesburg, our space offers a perfect retreat for business travelers, couples, or solo adventurers.

The space features a luxurious bedroom with premium bedding, a modern bathroom with all essentials, and a welcoming atmosphere that feels like home. Every detail has been curated to ensure your stay is nothing short of exceptional.`,
  highlights: [
    "5.0★ Guest Rating",
    "Superhost Status",
    "Instant Booking",
    "Self Check-in",
    "Free Cancellation (48h)",
    "Local Recommendations"
  ]
}

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
