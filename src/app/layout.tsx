import type { Metadata } from "next";
import { Outfit, Nunito } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "The Big 14 | Cozy Guesthouse in Randburg",
  description: "Your home away from home in Johannesburg! The Big 14 is a cozy, welcoming guesthouse with everything you need for a perfect stay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${nunito.variable}`}>
      <body className="font-body antialiased bg-cream text-charcoal">
        {children}
      </body>
    </html>
  );
}
