import { propertyDetails } from '@/lib/property';
import { ExternalLink } from 'lucide-react';

export default function BookingPlatforms() {
  const platforms = [
    {
      name: 'Airbnb',
      url: 'https://www.airbnb.com/rooms/1591430106686520580',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M12 2C9.243 2 7 4.243 7 7c0 1.107.347 2.133.938 2.973-.591.84-.938 1.866-.938 2.973 0 2.05 1.078 3.848 2.703 4.87-.03.27-.03.543 0 .814C7.078 19.152 6 20.95 6 23h2c0-1.657.895-3.118 2.234-3.91.418.2.88.31 1.366.31.486 0 .948-.11 1.366-.31C14.105 19.882 15 21.343 15 23h2c0-2.05-1.078-3.848-2.703-4.87.03-.27.03-.543 0-.814C15.922 15.794 17 13.996 17 11.946c0-1.107-.347-2.133-.938-2.973C16.653 9.133 17 8.107 17 7c0-2.757-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0 8c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3z"/>
        </svg>
      ),
      description: 'View on Airbnb',
    },
    {
      name: 'Booking.com',
      url: 'https://www.booking.com/hotel/za/big-14-guesthouse-randburg-johannesburg.html',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v12h16V6H4zm2 2h5v2H6V8zm0 4h5v2H6v-2zm7-4h5v2h-5V8zm0 4h5v2h-5v-2z"/>
        </svg>
      ),
      description: 'View on Booking.com',
    },
    {
      name: 'Lekkeslaap',
      url: 'https://www.lekkeslaap.co.za',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.4 7.2 16.9l.9-5.4L4.2 7.7l5.4-.8L12 2z"/>
        </svg>
      ),
      description: 'View on Lekkeslaap',
    },
  ];

  return (
    <section id="booking-platforms" className="py-16 bg-stone-50 scroll-mt-20">
      <div className="section-padding max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-stone-500 text-sm tracking-widest uppercase mb-4 block">
            How To Book
          </span>
          <h2 className="font-display text-3xl text-stone-900">
            Book Through Your Preferred Platform
          </h2>
          <p className="text-stone-500 mt-3">
            Choose any of our trusted booking partners below to secure your stay.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <a
              key={index}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-900 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                  {platform.icon}
                </div>
                <div>
                  <h3 className="font-display text-xl text-stone-900">{platform.name}</h3>
                  <p className="text-stone-500 text-sm">{platform.description}</p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition-colors" />
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-stone-500 text-sm">
            Online booking on this website is coming soon. For any questions, please <a href="/contact" className="underline hover:text-stone-900">contact us</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
