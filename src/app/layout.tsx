import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "The Big 14 | Premium Guesthouse Randburg",
  description: "Experience boutique comfort at The Big 14. A premium guesthouse in Randburg, Johannesburg with 5-star amenities and exceptional service.",
  keywords: "guesthouse, randburg, johannesburg, accommodation, boutique hotel, airbnb alternative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-white text-stone-900">
        {children}
      </body>
    </html>
  );
}
