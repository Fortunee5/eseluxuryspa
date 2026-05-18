import React, { useState, useEffect } from 'react';
import { HiX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import '../styles/BookingPopup.css';

const services = [
  {
    id: 1,
    name: null,
    description: null,
    price: '₵500',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop&auto=format',
    tag: 'Massage',
  },
  {
    id: 2,
    name: null,
    description: null,
    price: '₵200',
    image: 'https://i.pinimg.com/1200x/b5/c0/26/b5c0260c6926d7e1fede13874e479e34.jpg',
    tag: 'Body sculpting',
  },
  {
    id: 3,
    name: null,
    description: null,
    price: '₵300',
    image: 'https://i.pinimg.com/1200x/d2/3e/35/d23e35fcc7a12726a5dd39913b0ddd09.jpg',
    tag: 'Teeth whitening',
  },
  {
    id: 4,
    name: null,
    description: null,
    price: '₵300',
    image: 'https://i.pinimg.com/1200x/9a/3a/24/9a3a24993681a0505dff8629885419bc.jpg',
    tag: 'Nano peel',
  },
  {
    id: 5,
    name: null,
    description: null,
    price: '₵700',
    image: 'https://i.pinimg.com/736x/a8/69/c1/a869c13b99f149dc2528cac03ae8c217.jpg',
    tag: 'Derma glow peel',
  },
  {
    id: 6,
    name: null,
    description: null,
    price: '₵500',
    image: 'https://i.pinimg.com/1200x/a4/75/9a/a4759aa2a9cdd17010622ac62f213ba4.jpg',
    tag: 'Body scrub',
  },
  {
    id: 7,
    name: null,
    description: null,
    price: '₵500',
    image: 'https://i.pinimg.com/1200x/d8/e7/90/d8e7904b237cc670ab83256e5b346a35.jpg',
    tag: 'Lip Blush',
  },
  {
    id: 8,
    name: null,
    description: null,
    price: '₵500',
    image: 'https://i.pinimg.com/736x/a2/9a/56/a29a567ff10105fc7c6f90eba977a198.jpg',
    tag: 'Skin tag treatments',
  },
  {
    id: 9,
    name: null,
    description: null,
    price: '₵700',
    image: 'https://i.pinimg.com/1200x/e8/10/df/e810df83272455f4b9107eec56dcf3cb.jpg',
    tag: 'Fat Injections',
  },
  {
    id: 10,
    name: null,
    description: null,
    price: '₵200',
    image: 'https://i.pinimg.com/736x/c5/01/3b/c5013bd7012c81b6557b3e4325af8295.jpg',
    tag: 'Pedicure',
  },
];

const BookingPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
      if (!hasSeenPopup) {
        setIsVisible(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('hasSeenPopup', 'true');
  };

  const handleBook = () => {
    handleClose();
    navigate('/booking');
  };

  const handleCardClick = (service) => {
    setSelectedService(selectedService?.id === service.id ? null : service);
  };

  if (!isVisible) return null;

  return (
    <div className="booking-popup-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="booking-popup-content">

        {/* Header */}
        <div className="popup-header">
          <div className="popup-header-text">
            <span className="popup-eyebrow">✦ SpaRadise Services</span>
            <h2 className="popup-title">Choose Your Experience</h2>
          </div>
          <button className="close-popup" onClick={handleClose} aria-label="Close popup">
            <HiX />
          </button>
        </div>

        {/* Scrollable Service Grid */}
        <div className="popup-services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-card ${selectedService?.id === service.id ? 'service-card--selected' : ''}`}
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => handleCardClick(service)}
            >
              {service.tag && (
                <span className="service-card__tag">{service.tag}</span>
              )}
              <div className="service-card__image-wrap">
                <img
                  src={service.image}
                  alt={service.name}
                  className="service-card__image"
                  loading="lazy"
                />
                <div className="service-card__image-overlay" />
              </div>
              <div className="service-card__body">
                <h3 className="service-card__name">{service.name}</h3>
                <p className="service-card__desc">{service.description}</p>
                <span className="service-card__price">{service.price}</span>
              </div>
              <div className="service-card__selected-indicator">
                <span>✓</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="popup-footer">
          <div className="popup-footer-info">
            {selectedService ? (
              <span className="popup-footer-selected">
                <span className="popup-footer-selected-dot" />
                {selectedService.name} — {selectedService.price}
              </span>
            ) : (
              <span className="popup-footer-hint">Select a service or browse all at booking</span>
            )}
          </div>
          <button className="popup-btn" onClick={handleBook}>
            <span>Book My Session</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookingPopup;
