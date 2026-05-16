import React from 'react';
import ServicesSection from '../sections/ServicesSection';
import PricingSection from '../sections/PricingSection';

const Services = () => {
  return (
    <div className="pt-navbar">
      <div className="page-header section-padding" style={{backgroundColor: 'var(--color-dark-charcoal)', color: 'white', textAlign: 'center'}}>
        <div className="container">
          <h1 style={{color: 'white', fontSize: '48px'}}>Our Services</h1>
          <p style={{color: 'var(--color-gold)', marginTop: '10px', letterSpacing: '2px', textTransform: 'uppercase'}}>Curated Wellness Experiences</p>
        </div>
      </div>
      <ServicesSection />
      <PricingSection />
    </div>
  );
};

export default Services;
