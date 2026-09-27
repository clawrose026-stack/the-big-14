import Reveal from './Reveal';
import { livePlatforms } from '@/lib/property';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

const icons: Record<string, React.ReactNode> = {
  airbnb: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden>
      <path d="M12 2C9.243 2 7 4.243 7 7c0 1.107.347 2.133.938 2.973-.591.84-.938 1.866-.938 2.973 0 2.05 1.078 3.848 2.703 4.87-.03.27-.03.543 0 .814C7.078 19.152 6 20.95 6 23h2c0-1.657.895-3.118 2.234-3.91.418.2.88.31 1.366.31.486 0 .948-.11 1.366-.31C14.105 19.882 15 21.343 15 23h2c0-2.05-1.078-3.848-2.703-4.87.03-.27.03-.543 0-.814C15.922 15.794 17 13.996 17 11.946c0-1.107-.347-2.133-.938-2.973C16.653 9.133 17 8.107 17 7c0-2.757-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0 8c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3z" />
    </svg>
  ),
  'booking-com': (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v12h16V6H4zm2 2h5v2H6V8zm0 4h5v2H6v-2zm7-4h5v2h-5V8zm0 4h5v2h-5v-2z" />
    </svg>
  ),
  lekkeslaap: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden>
      <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.4 7.2 16.9l.9-5.4L4.2 7.7l5.4-.8L12 2z" />
    </svg>
  ),
};

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
            Same room, same rate. Choose whichever of our trusted partners you
            already have an account with.
          </p>
        </Reveal>

        <ul className="space-y-3 sm:space-y-4">
          {livePlatforms.map((platform, index) => (
            <li key={platform.id}>
              <Reveal delay={index * 90}>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group card card-hover !p-5 sm:!p-6 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-900 transition-colors duration-300 group-hover:text-white ${platform.accent}`}
                    >
                      {icons[platform.id]}
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
          ))}
        </ul>

        <Reveal
          delay={200}
          className="mt-10 flex items-center justify-center gap-2.5 text-sm text-stone-500"
        >
          <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden />
          <p>
            Booked through a partner, hosted by us. Questions before you book?{' '}
            <a
              href="/contact"
              className="text-stone-900 font-medium underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors"
            >
              Get in touch
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
