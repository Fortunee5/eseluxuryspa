import React from 'react';
import PricingSection from '../sections/PricingSection';

const Pricing = () => {
  return (
    <div className="pt-navbar">
      <div className="page-header section-padding" style={{backgroundColor: 'var(--color-dark-charcoal)', color: 'white', textAlign: 'center'}}>
        <div className="container">
          <h1 style={{color: 'white', fontSize: '48px'}}>Pricing Plans</h1>
          <p style={{color: 'var(--color-gold)', marginTop: '10px', letterSpacing: '2px', textTransform: 'uppercase'}}>Luxury within reach</p>
        </div>
      </div>
      <PricingSection />
    </div>
  );
};

export default Pricing;
