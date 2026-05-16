import React from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';

const Contact = () => {
  return (
    <div className="pt-navbar">
      <div className="page-header section-padding" style={{backgroundColor: 'var(--color-dark-charcoal)', color: 'white', textAlign: 'center'}}>
        <div className="container">
          <h1 style={{color: 'white', fontSize: '48px'}}>Contact Us</h1>
          <p style={{color: 'var(--color-gold)', marginTop: '10px', letterSpacing: '2px', textTransform: 'uppercase'}}>Get In Touch</p>
        </div>
      </div>

      <div className="container section-padding">
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px'}}>
          <div>
            <SectionTitle subtitle="Reach Out" title="We'd Love To Hear From You" align="left" />
            <p style={{color: '#666', marginBottom: '30px'}}>Have questions about our treatments or want to book a private event? Our team is here to assist you with all your wellness needs.</p>
            
            <div style={{marginBottom: '20px'}}>
              <h4 style={{marginBottom: '5px'}}>Location</h4>
              <p style={{color: '#666'}}>61 lokko road osu beside karena cake, Accra, Ghana</p>
            </div>
            <div style={{marginBottom: '20px'}}>
              <h4 style={{marginBottom: '5px'}}>Call Us</h4>
              <p style={{color: '#666'}}>0534533217, 0500169264</p>
            </div>
            <div style={{marginBottom: '20px'}}>
              <h4 style={{marginBottom: '5px'}}>Email Us</h4>
              <p style={{color: '#666'}}>hello@eseluxuryspa.com</p>
            </div>
          </div>

          <div style={{backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'}}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <input type="text" placeholder="Your Name" style={{padding: '12px', border: '1px solid var(--color-beige)', borderRadius: '4px'}} />
                <input type="email" placeholder="Your Email" style={{padding: '12px', border: '1px solid var(--color-beige)', borderRadius: '4px'}} />
                <textarea placeholder="Your Message" rows="5" style={{padding: '12px', border: '1px solid var(--color-beige)', borderRadius: '4px'}}></textarea>
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
