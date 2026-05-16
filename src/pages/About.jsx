import React from 'react';
import SectionTitle from '../components/SectionTitle';
import AboutSection from '../sections/AboutSection';
import TestimonialsSection from '../sections/TestimonialsSection';

const About = () => {
  return (
    <div className="pt-navbar">
      <div className="page-header section-padding" style={{backgroundColor: 'var(--color-dark-charcoal)', color: 'white', textAlign: 'center'}}>
        <div className="container">
          <h1 style={{color: 'white', fontSize: '48px'}}>About Our Spa</h1>
          <p style={{color: 'var(--color-gold)', marginTop: '10px', letterSpacing: '2px', textTransform: 'uppercase'}}>The Essence of Elegance</p>
        </div>
      </div>
      <AboutSection />
      <TestimonialsSection />
    </div>
  );
};

export default About;
