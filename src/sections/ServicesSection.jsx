import React, { useEffect, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import { staggerFadeIn } from '../animations';
import '../styles/ServicesSection.css';

const services = [
  {
    title: 'Massage Therapy',
    image: 'https://i.pinimg.com/1200x/af/1c/80/af1c8063400cbb7b2cb5bfdee9180eeb.jpg',
    description: 'Release tension and find deep relaxation with our professional massage techniques.'
  },
  {
    title: 'Facial Treatment',
    image: 'https://i.pinimg.com/1200x/26/e4/d2/26e4d2cf52534582c6fe7734cbb28b66.jpg',
    description: 'Restore your natural glow with our customized skin treatments and premium products.'
  },
  {
    title: 'Aromatherapy',
    image: 'https://i.pinimg.com/1200x/57/ff/08/57ff08813e13309fc6b8ae855e4e2982.jpg',
    description: 'Balance your senses with essential oils curated to enhance your physical and emotional well-being.'
  },
  {
    title: 'Sauna Therapy',
    image: 'https://i.pinimg.com/736x/eb/e2/3f/ebe23fc5ab075b05c33c2b7ccf9a1166.jpg',
    description: 'Detoxify and improve circulation in our state-of-the-art luxury sauna facilities.'
  },
  {
    title: 'Body Treatment',
    image: 'https://i.pinimg.com/1200x/fe/fd/c6/fefdc663959f2d1bfd0da05fd1d3e3d2.jpg',
    description: 'Exfoliate and nourish your skin with our signature body scrubs and wraps.'
  },
  {
    title: 'Wellness Therapy',
    image: 'https://i.pinimg.com/1200x/ba/2b/03/ba2b036f657338a8aa2528c2d9ec393a.jpg',
    description: 'Holistic approaches to wellness including yoga, meditation, and nutritional advice.'
  }
];

const ServicesSection = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current.querySelectorAll('.service-card');
    staggerFadeIn(cards);
  }, []);

  return (
    <section className="services-section section-padding">
      <div className="container">
        <SectionTitle 
          subtitle="Our Luxury Services" 
          title="Pure Bliss & Relaxation" 
        />
        
        <div className="services-grid" ref={gridRef}>
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-img">
                <img src={service.image} alt={service.title} />
                <div className="service-overlay">
                  <p>{service.description}</p>
                </div>
              </div>
              <div className="service-info">
                <h3>{service.title}</h3>
                <a href="/services" className="read-more">Learn More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
