import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { staggerFadeIn } from '../animations';
import '../styles/ServicesSection.css';

const GAS_URL = 'https://script.google.com/macros/s/AKfycby2i5W-txKpETQEuu40VRfvNtJ8Z9F_1ZgRaDbWkNI1vyFeay1pxsVHyglrsKyysqrl/exec';

const defaultServices = [
  {
    title: 'Massage Therapy',
    image: 'https://i.pinimg.com/1200x/af/1c/80/af1c8063400cbb7b2cb5bfdee9180eeb.jpg',
    description: null,
  },
  {
    title: 'Teeth Whitening',
    image: 'https://i.pinimg.com/1200x/d2/3e/35/d23e35fcc7a12726a5dd39913b0ddd09.jpg',
    description: null,
  },
  {
    title: 'Lip Blush',
    image: 'https://i.pinimg.com/1200x/d8/e7/90/d8e7904b237cc670ab83256e5b346a35.jpg',
    description: null,
  },
  {
    title: 'Fat Injection',
    image: 'https://i.pinimg.com/1200x/e8/10/df/e810df83272455f4b9107eec56dcf3cb.jpg',
    description: null,
  },
  {
    title: 'Pedicure',
    image: 'https://i.pinimg.com/736x/c5/01/3b/c5013bd7012c81b6557b3e4325af8295.jpg',
    description: null,
  },
  {
    title: 'Nano Peel',
    image: 'https://i.pinimg.com/1200x/9a/3a/24/9a3a24993681a0505dff8629885419bc.jpg',
    description: null,
  },
  {
    title: 'Nails',
    image: 'https://i.pinimg.com/736x/d1/44/bd/d144bd080e853fdf6fa0eb15d371334c.jpg',
    description: null,
  },
];

const ServicesSection = () => {
  const gridRef    = useRef(null);
  const navigate   = useNavigate();
  const [adminCards, setAdminCards] = useState([]);

  useEffect(() => {
    fetch(`${GAS_URL}?type=sectionServices`)
      .then(r => r.json())
      .then(data => setAdminCards(Array.isArray(data) ? data : []))
      .catch(() => setAdminCards([]));
  }, []);

  const allServices = [
    ...defaultServices,
    ...adminCards.map(c => ({ title: c.title, image: c.image, description: null })),
  ];

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.service-card');
      staggerFadeIn(cards);
    }
  }, [adminCards]);

  const handleCardClick = () => navigate('/booking');

  return (
    <section className="services-section section-padding">
      <div className="container">
        <SectionTitle
          subtitle="Our Luxury Services"
          title="Pure Bliss & Relaxation"
        />
        <div className="services-grid" ref={gridRef}>
          {allServices.map((service, index) => (
            <div
              key={index}
              className="service-card service-card--clickable"
              onClick={handleCardClick}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleCardClick()}
              aria-label={`Book ${service.title}`}
            >
              <div className="service-img">
                <img src={service.image} alt={service.title} />
                <div className="service-overlay">
                  <p>{service.description}</p>
                  <span className="service-book-cta">Book Now →</span>
                </div>
              </div>
              <div className="service-info">
                <h3>{service.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
