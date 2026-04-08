'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Search, ArrowRight, Loader2 } from 'lucide-react';

export default function TrackPage() {
  const [ref, setRef] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ref.trim()) return;
    
    setLoading(true);
    // Standardize the ref format (e.g., TBF-12345678)
    const formattedRef = ref.trim().toUpperCase();
    router.push(`/timeline/${formattedRef}`);
  };

  return (
    <main className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center section-padding py-12">
        <div className="max-w-md w-full">
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-stone-100">
            <div className="w-16 h-16 bg-stone-900 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Search className="text-white w-8 h-8" />
            </div>
            
            <h1 className="font-display text-3xl text-stone-900 text-center mb-2">Track Your Stay</h1>
            <p className="text-stone-600 text-center mb-8">
              Enter your booking reference to see your upcoming milestones and check-in details.
            </p>
            
            <form onSubmit={handleTrack} className="space-y-4">
              <div>
                <label htmlFor="ref" className="block text-sm font-medium text-stone-700 mb-2 font-display">
                  Booking Reference
                </label>
                <input
                  id="ref"
                  type="text"
                  placeholder="e.g. TBF-12345678"
                  value={ref}
                  onChange={(e) => setRef(e.target.value)}
                  className="w-full px-4 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all font-mono text-lg uppercase tracking-wider"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading || !ref.trim()}
                className="w-full bg-stone-900 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-stone-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Track Milestone <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-stone-100 text-center">
              <p className="text-sm text-stone-500">
                Can't find your reference? Check your confirmation email or contact support.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
