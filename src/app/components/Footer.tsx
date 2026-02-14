import { propertyDetails } from '@/lib/property';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white py-8 border-t border-white/10">
      <div className="section-padding max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl font-bold">{propertyDetails.name}</h3>
            <p className="text-white/50 text-sm mt-1">
              Your cozy home in {propertyDetails.location.neighborhood} 🏡
            </p>
          </div>

          <div className="flex gap-8 text-sm text-white/50">
            <a href="#about" className="hover:text-coral transition-colors">About</a>
            <a href="#book" className="hover:text-coral transition-colors">Book</a>
            <a href="#" className="hover:text-coral transition-colors">Terms</a>
            <a href="#" className="hover:text-coral transition-colors">Privacy</a>
          </div>

          <div className="text-white/50 text-sm">
            © {currentYear} {propertyDetails.name}. Made with ❤️ in Jozi
          </div>
        </div>
      </div>
    </footer>
  );
}
