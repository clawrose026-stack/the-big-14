import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Amenities from './components/Amenities';
import BookingCalendar from './components/BookingCalendar';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Gallery />
      <Amenities />
      <BookingCalendar />
      <Contact />
      <Footer />
    </main>
  );
}
