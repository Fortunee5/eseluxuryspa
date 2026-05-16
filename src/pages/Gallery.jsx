import React from 'react';
import GallerySection from '../sections/GallerySection';

const Gallery = () => {
  return (
    <div className="pt-navbar">
      <div className="page-header section-padding" style={{backgroundColor: 'var(--color-dark-charcoal)', color: 'white', textAlign: 'center'}}>
        <div className="container">
          <h1 style={{color: 'white', fontSize: '48px'}}>Gallery</h1>
          <p style={{color: 'var(--color-gold)', marginTop: '10px', letterSpacing: '2px', textTransform: 'uppercase'}}>Visual Serenity</p>
        </div>
      </div>
      <GallerySection />
    </div>
  );
};

export default Gallery;
