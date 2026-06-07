import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import '../styles/Booking.css';

const GAS_URL = 'https://script.google.com/macros/s/AKfycby2i5W-txKpETQEuu40VRfvNtJ8Z9F_1ZgRaDbWkNI1vyFeay1pxsVHyglrsKyysqrl/exec';

const Booking = () => {
  const [services,  setServices]  = useState([]);
  const [svcLoading, setSvcLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    service: '', date: '', time: '', message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error,     setError]     = useState(null);

  // Load services from Google Sheet (visible to all devices)
  useEffect(() => {
    fetch(`${GAS_URL}?type=adminServices`)
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : [];
        setServices(list);
        if (list.length > 0) setFormData(prev => ({ ...prev, service: list[0].name }));
      })
      .catch(() => setServices([]))
      .finally(() => setSvcLoading(false));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const newBooking = {
      ...formData,
      id: Date.now(),
      status: 'Pending',
      createdAt: new Date().toLocaleString()
    };

    // Still save to localStorage so admin dashboard on THIS device can see it
    const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...existing, newBooking]));

    try {
      // action omitted = legacy booking path in Apps Script
      await fetch(GAS_URL, {
        method : 'POST',
        mode   : 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body   : JSON.stringify(newBooking),
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: services[0]?.name || '', date: '', time: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError('Submission failed. Please try again or contact us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="booking-page section-padding">
      <div className="container">
        <SectionTitle subtitle="Reservations" title="Book Your Sanctuary" />

        <div className="booking-container">
          <div className="booking-form-wrapper">
            {submitted ? (
              <div className="success-message">
                <h3>Thank You!</h3>
                <p>Your booking request has been received. Our team will contact you shortly to confirm your appointment.</p>
              </div>
            ) : (
              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your name" />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Your phone number" />
                  </div>
                  <div className="form-group">
                    <label>Select Service</label>
                    <select name="service" value={formData.service} onChange={handleChange} required>
                      {svcLoading ? (
                        <option value="" disabled>Loading services…</option>
                      ) : services.length === 0 ? (
                        <option value="" disabled>No services available</option>
                      ) : (
                        services.map((svc) => (
                          <option key={svc.id} value={svc.name}>
                            {svc.name}{svc.price ? ` - ₵${svc.price}` : ''}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Preferred Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Preferred Time</label>
                    <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Special Instructions</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Tell us any special requests"></textarea>
                </div>

                {error && <p style={{ color: 'red', marginBottom: '15px', fontSize: '14px' }}>{error}</p>}

                <Button type="submit" variant="dark" disabled={isLoading || services.length === 0 || svcLoading}>
                  {isLoading ? 'Submitting…' : 'Confirm Booking'}
                </Button>
              </form>
            )}
          </div>

          <div className="booking-info">
            <div className="info-box">
              <h3>Opening Hours</h3>
              <ul>
                <li><span>Mon - Fri:</span> 9:00 AM - 8:00 PM</li>
                <li><span>Saturday:</span> 10:00 AM - 6:00 PM</li>
                <li><span>Sunday:</span> 12:00 PM - 5:00 PM</li>
              </ul>
            </div>
            <div className="info-box">
              <h3>Contact Info</h3>
              <p>61 lokko road osu beside karena cake, Accra, Ghana</p>
              <p>0534533217 0500169264</p>
              <p>reservations@esespa.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
