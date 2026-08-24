import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaPinterestP, FaTiktok, FaMapMarkerAlt, FaDirections } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleAdminClick = (e) => {
    e.preventDefault();
    navigate('/admin-login');
  };

  // No external map images/iframes here at all — the "map" look is drawn
  // with pure CSS on a black background (see .map-frame-wrap in Footer.css),
  // so there is zero network request and nothing that can lag or fail to load.
  // "Directions" opens the precise, fully interactive location in Google Maps
  // in a new tab, so nothing heavy ever runs on your own page.
  const locations = [
    {
      id: 'lagos',
      city: 'Lagos, Nigeria',
      address: '18 Balogun Taiwo Close, Ikeja, Lagos, Nigeria',
      directionsUrl:
        'https://www.google.com/maps/dir/?api=1&destination=18+Balogun+Taiwo+Close,+Ikeja,+Lagos,+Nigeria',
    },
    {
      id: 'accra',
      city: 'Accra, Ghana',
      address: '61 Lokko Road, Osu (beside Karena Cake), Accra, Ghana',
      directionsUrl:
        'https://www.google.com/maps/dir/?api=1&destination=61+Lokko+Road,+Osu,+Accra,+Ghana',
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col about">
            <Link to="/" className="footer-logo">ESE <span>Luxury Spa & Cosmetics</span></Link>
            <p>Providing the ultimate relaxation and wellness experience in Accra since 2019. Your journey to rejuvenation begins here.</p>
            <div className="social-links">
              <a href="https://www.instagram.com/ese.luxuryspagh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><FaInstagram /></a>
              <a href="#"><FaFacebookF /></a>
              <a href="https://www.tiktok.com/@eseluxuryspagh?_r=1&_t=ZS-96Qxgm6PXrL"><FaTiktok/></a>
            </div>
          </div>

          <div className="footer-col links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/pricing">Pricing Plans</Link></li>
              <li><Link to="/booking">Book Appointment</Link></li>
            </ul>
          </div>

          <div className="footer-col contact">
            <h3>Contact Us</h3>
            <p>61 lokko road osu beside karena cake<br />Accra, Ghana.<br /> 18 balogun taiwo close Ikeja <br /> Lagos, Nigeria</p>
            <p>Phone: 0534533217 0500169264<br /> +2349023495565</p>
            <p>Email: hello@eseluxuryspa.com</p>
          </div>

          <div className="footer-col newsletter">
            <h3>Newsletter</h3>
            <p>Subscribe to get the latest updates and offers.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your Email Address" />
              <button type="submit">Join</button>
            </form>
          </div>
        </div>

        <div className="footer-maps">
          <h3 className="footer-maps-title">Visit Us</h3>
          <div className="footer-maps-grid">
            {locations.map((loc) => (
              <a
                className="map-card"
                key={loc.id}
                href={loc.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="map-frame-wrap" role="img" aria-label={`Map location - ${loc.city}`}>
                  <span className="map-pin-overlay">
                    <FaMapMarkerAlt />
                  </span>
                </div>
                <div className="map-card-info">
                  <div className="map-card-text">
                    <span className="map-card-city">
                      <FaMapMarkerAlt className="map-pin-icon" />
                      {loc.city}
                    </span>
                    <p>{loc.address}</p>
                  </div>
                  <span className="map-directions-btn">
                    <FaDirections />
                    Directions
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p onClick={handleAdminClick} className="copyright-trigger">
            &copy; {currentYear} All right reserved
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
