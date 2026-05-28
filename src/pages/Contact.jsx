import React from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="pt-navbar">
      <div className="page-header section-padding contact-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get In Touch</p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="contact-grid">
          <div className="contact-info-col">
            <SectionTitle subtitle="Reach Out" title="We'd Love To Hear From You" align="left" />
            <p>Have questions about our treatments or want to book a private event? Our team is here to assist you with all your wellness needs.</p>

            <div className="contact-detail">
              <h4>Location</h4>
              <p>61 lokko road osu beside karena cake, Accra, Ghana</p>
            </div>
            <div className="contact-detail">
              <h4>Call Us</h4>
              <p>0534533217, 0500169264</p>
            </div>
            <div className="contact-detail">
              <h4>Email Us</h4>
              <p>hello@eseluxuryspa.com</p>
            </div>
          </div>

          <div className="contact-form-card">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="contact-form-fields">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <textarea placeholder="Your Message" rows="5"></textarea>
                <Button variant="dark">Send Message</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
