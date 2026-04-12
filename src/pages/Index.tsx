import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyUs from "@/components/WhyUs";
import RoutePlanner from "@/components/RoutePlanner";
import Pricing from "@/components/Pricing";
import Lodging from "@/components/Lodging";
import Gallery from "@/components/Gallery";
import Tips from "@/components/Tips";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookingClick = () => setIsBookingOpen(true);

  return (
    <main className="overflow-x-hidden">
      <Navbar onBookingClick={handleBookingClick} />
      <Hero onBookingClick={handleBookingClick} />
      <About />
      <WhyUs />
      <RoutePlanner onBookingClick={handleBookingClick} />
      <Pricing onBookingClick={handleBookingClick} />
      <Lodging />
      <Gallery />
      <Tips />
      <CTA onBookingClick={handleBookingClick} />
      <Footer />
      
      <BookingModal 
        open={isBookingOpen} 
        onOpenChange={setIsBookingOpen} 
      />
    </main>
  );
};

export default Index;
