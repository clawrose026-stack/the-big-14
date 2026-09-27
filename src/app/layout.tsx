import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteUrl, isProduction } from "@/lib/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Big 14 | Premium Guesthouse Randburg",
    template: "%s | The Big 14",
  },
  description:
    "Experience boutique comfort at The Big 14. A premium guesthouse in Randburg, Johannesburg with 5-star amenities and exceptional service.",
  keywords: [
    "guesthouse randburg",
    "accommodation randburg",
    "johannesburg guesthouse",
    "boutique stay johannesburg",
    "self check-in randburg",
  ],
  applicationName: "The Big 14",
  alternates: { canonical: "/" },
  // Preview deployments stay out of the index; production is fully crawlable.
  robots: isProduction
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    siteName: "The Big 14",
    title: "The Big 14 | Premium Guesthouse Randburg",
    description:
      "Boutique comfort in the heart of Randburg, Johannesburg. Book your stay at The Big 14.",
    type: "website",
    locale: "en_ZA",
    url: "/",
    images: [
      {
        url: "/images/exterior.jpg",
        width: 1200,
        height: 630,
        alt: "The Big 14 guesthouse in Randburg, Johannesburg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Big 14 | Premium Guesthouse Randburg",
    description:
      "Boutique comfort in the heart of Randburg, Johannesburg. Book your stay at The Big 14.",
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
