import React from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import '../styles/PricingSection.css';

const plans = [
  {
    name: 'Relaxation Day',
    price: '2,000',
    features: ['Massage Therapy', 'Sauna Access', 'Herbal Tea', 'Refreshing Facial'],
    featured: false
  },
  {
    name: 'Luxury Wellness',
    price: '5,000',
    features: ['Deep Tissue Massage', 'Full Body Scrub', 'Luxury Facial', 'Sauna & Pool', 'Healthy Lunch'],
    featured: true
  },
  {
    name: 'Ultimate Escape',
    price: '4,500',
    features: ['Full Day Access', 'All Treatments', 'Private Suite', 'Premium Gift Set', 'Champagne'],
    featured: false
  }
];

const PricingSection = () => {
  return (
    <section className="pricing-section section-padding">
      <div className="container">
        <SectionTitle 
          subtitle="Our Pricing" 
          title="Choose Your Experience" 
        />
        
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
              {plan.featured && <span className="badge">Most Popular</span>}
              <h3>{plan.name}</h3>
              <div className="price">
                <span className="currency">₵</span>
                <span className="amount">{plan.price}</span>
              </div>
              <ul className="features-list">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex}>{feature}</li>
                ))}
              </ul>
              <Button 
                variant={plan.featured ? 'primary' : 'outline'}
                onClick={() => window.location.href='/booking'}
              >
                Book Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
