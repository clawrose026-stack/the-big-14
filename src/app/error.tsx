'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="bg-stone-50 min-h-screen flex items-center">
      <div className="section-padding max-w-xl mx-auto py-24 text-center">
        <div className="w-16 h-16 bg-stone-900 rounded-2xl flex items-center justify-center mx-auto mb-7">
          <AlertTriangle className="w-8 h-8 text-white" aria-hidden />
        </div>
        <h1 className="font-display text-4xl text-stone-900">
          Something went wrong
        </h1>
        <p className="text-stone-500 mt-5 text-lg">
          Sorry about that. Try again, or reach us directly on WhatsApp and
          we&apos;ll sort it out.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="btn-primary">
            Try Again
          </button>
          <Link href="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
