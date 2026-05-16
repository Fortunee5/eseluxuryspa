import React from 'react';
import Hero from '../sections/Hero';
import AboutSection from '../sections/AboutSection';
import ServicesSection from '../sections/ServicesSection';
import GallerySection from '../sections/GallerySection';
import TestimonialsSection from '../sections/TestimonialsSection';
import PricingSection from '../sections/PricingSection';

const Home = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <PricingSection />
    </>
  );
};

export default Home;
