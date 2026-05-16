import React, { useState, useEffect } from 'react';
import { HiX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import '../styles/BookingPopup.css';

const BookingPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  if (!isVisible) return null;

  return (
    <div className="booking-popup-overlay">
      <div className="booking-popup-content">
        <button className="close-popup" onClick={handleClose}><HiX /></button>
        <div className="popup-image">
          <img src="https://i.pinimg.com/736x/e1/31/8f/e1318f74a62262e8dec4d022f6824fde.jpg" alt="Spa Treatment" />
        </div>
        <div className="popup-details">
          <span className="subtitle">Special Offer</span>
          <h2>Relax & Rejuvenate</h2>
          <p>Book your first massage therapy session today and get 20% off your next visit.</p>
          <button className="popup-btn" onClick={handleBook}>Book My Session</button>
        </div>
      </div>
    </div>
  );
};

export default BookingPopup;
