import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="bg-stone-50">
        <div className="section-padding max-w-xl mx-auto py-24 lg:py-32 text-center">
          <div className="w-16 h-16 bg-stone-900 rounded-2xl flex items-center justify-center mx-auto mb-7">
            <Compass className="w-8 h-8 text-white" aria-hidden />
          </div>
          <p className="eyebrow mb-4 justify-center">Error 404</p>
          <h1 className="font-display text-4xl lg:text-5xl text-stone-900">
            This page took a wrong turn
          </h1>
          <p className="text-stone-500 mt-5 text-lg">
            The page you were looking for doesn&apos;t exist — but the room is
            still available.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/#booking-platforms" className="btn-primary">
              Book Your Stay
            </Link>
            <Link href="/" className="btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
