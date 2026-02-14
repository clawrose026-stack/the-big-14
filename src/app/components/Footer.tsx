import { propertyDetails } from '@/lib/property';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-white py-12 border-t border-white/10">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl">{propertyDetails.name}</h3>
            <p className="text-stone-500 text-sm mt-1">
              Premium Guesthouse in {propertyDetails.location.neighborhood}
            </p>
          </div>

          <div className="flex gap-8 text-sm text-stone-500">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#book" className="hover:text-white transition-colors">Book</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>

          <div className="text-stone-500 text-sm">
            © {currentYear} {propertyDetails.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
