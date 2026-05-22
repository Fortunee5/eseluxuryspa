import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaPinterestP, FaTiktok } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleAdminClick = (e) => {
    e.preventDefault();
    navigate('/admin-login');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col about">
            <Link to="/" className="footer-logo">ESE <span>Luxury Spa & Cosmetics</span></Link>
            <p>Providing the ultimate relaxation and wellness experience in Accra since 2019. Your journey to rejuvenation begins here.</p>
            <div className="social-links">
              <a href="#"><FaInstagram /></a>
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
            <p>61 lokko road osu beside karena cake<br />Accra, Ghana</p>
            <p>Phone: 0534533217 0500169264</p>
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
