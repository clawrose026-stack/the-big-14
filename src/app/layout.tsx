import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "The Big 14 | Premium Guesthouse Randburg",
  description:
    "Experience boutique comfort at The Big 14. A premium guesthouse in Randburg, Johannesburg with 5-star amenities and exceptional service.",
  keywords:
    "guesthouse, randburg, johannesburg, accommodation, boutique hotel, airbnb alternative",
  openGraph: {
    title: "The Big 14 | Premium Guesthouse Randburg",
    description:
      "Boutique comfort in the heart of Randburg, Johannesburg. Book your stay at The Big 14.",
    type: "website",
    locale: "en_ZA",
    images: ["/images/exterior.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1917",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-white text-stone-900">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-stone-900 focus:text-white focus:px-5 focus:py-3 focus:rounded-full focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
