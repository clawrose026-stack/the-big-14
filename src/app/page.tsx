import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import BookingPlatforms from './components/BookingPlatforms';
import Amenities from './components/Amenities';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButton from './components/FloatingButton';
import StructuredData from './components/StructuredData';

export default function Home() {
  return (
    <>
      <StructuredData />
      <Header />

      <main id="main">
        <Hero />
        <Gallery />
        <BookingPlatforms />
        <Amenities />
        <Contact />
      </main>

      <Footer />
      <FloatingButton />
    </>
  );
}
