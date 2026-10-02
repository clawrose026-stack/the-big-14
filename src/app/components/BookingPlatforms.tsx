import Reveal from './Reveal';
import { livePlatforms } from '@/lib/property';
import { platformIcons } from './icons/PlatformIcons';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function BookingPlatforms() {
  return (
    <section
      id="booking-platforms"
      className="py-20 lg:py-28 bg-white scroll-mt-24"
    >
      <div className="section-padding max-w-5xl mx-auto">
        <Reveal className="text-center mb-12 lg:mb-14 max-w-2xl mx-auto">
          <span className="eyebrow mb-4">How To Book</span>
          <h2 className="font-display text-3xl lg:text-4xl text-stone-900">
            Book Through Your Preferred Platform
          </h2>
          <p className="text-stone-500 mt-4 text-lg">
            Choose whichever of our trusted partners you already have an account
            with. Rates and cancellation terms are set by each platform.
          </p>
        </Reveal>

        <ul className="space-y-3 sm:space-y-4">
          {livePlatforms.map((platform, index) => {
            const mark = platformIcons[platform.id];
            return (
              <li key={platform.id}>
                <Reveal delay={index * 90}>
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="platform_click"
                    data-platform={platform.id}
                    data-section="booking"
                    className="group card card-hover !p-5 sm:!p-6 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                      {/* Charcoal tile, inverting to black on hover. */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl flex items-center justify-center bg-stone-100 text-stone-800 ring-1 ring-stone-900/5 transition-colors duration-300 group-hover:bg-stone-900 group-hover:text-white">
                        {mark && <mark.Icon className={mark.size} />}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-lg sm:text-xl text-stone-900">
                          {platform.name}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </h3>
                        <p className="text-stone-500 text-sm mt-0.5">
                          {platform.description}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-stone-400 transition-all duration-300 group-hover:bg-stone-900 group-hover:text-white">
                      <ArrowUpRight className="w-5 h-5" aria-hidden />
                    </span>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal
          delay={200}
          className="mt-10 flex items-center justify-center gap-2.5 text-sm text-stone-500"
        >
          <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden />
          <p>
            Booked through a partner, hosted by us. Read our{' '}
            <a
              href="/house-rules"
              className="text-stone-900 font-medium underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors"
            >
              house rules
            </a>{' '}
            before you book, or{' '}
            <a
              href="/contact"
              className="text-stone-900 font-medium underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors"
            >
              get in touch
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
