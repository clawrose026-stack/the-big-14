import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import BookingPlatforms from './components/BookingPlatforms';
import Amenities from './components/Amenities';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButton from './components/FloatingButton';

export default function Home() {
  return (
    <main>
      <Header />
      
      <Hero />
      <Gallery />
      <BookingPlatforms />
      <Amenities />
      <Contact />
      <Footer />
      <FloatingButton />
    </main>
  );
}
