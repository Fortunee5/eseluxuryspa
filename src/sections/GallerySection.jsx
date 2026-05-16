import React, { useRef, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import '../styles/GallerySection.css';

const row1 = [
  'https://i.pinimg.com/736x/9a/b2/d3/9ab2d33761639c9028c9d07bce52299d.jpg',
  'https://i.pinimg.com/1200x/5c/54/f6/5c54f6a5185c228917e07ef0e4c76b0e.jpg',
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
  'https://i.pinimg.com/1200x/e5/f4/88/e5f488687abd33a14c9da43a0578dd8c.jpg',
  'https://i.pinimg.com/1200x/bd/91/e1/bd91e141e64b0cd32cf36c428fa1a595.jpg',
  'https://i.pinimg.com/736x/6d/d8/45/6dd8452b8642822792cff922c8bf5f65.jpg',
];

const row2 = [
  'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80',
  'https://i.pinimg.com/1200x/5c/54/f6/5c54f6a5185c228917e07ef0e4c76b0e.jpg',
  'https://i.pinimg.com/1200x/bd/91/e1/bd91e141e64b0cd32cf36c428fa1a595.jpg',
];

const col1 = [
  'https://i.pinimg.com/1200x/e5/f4/88/e5f488687abd33a14c9da43a0578dd8c.jpg',
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
  'https://i.pinimg.com/736x/6d/d8/45/6dd8452b8642822792cff922c8bf5f65.jpg',
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
];

const col2 = [
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  'https://i.pinimg.com/1200x/bd/91/e1/bd91e141e64b0cd32cf36c428fa1a595.jpg',
  'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
  'https://i.pinimg.com/1200x/5c/54/f6/5c54f6a5185c228917e07ef0e4c76b0e.jpg',
];

const MarqueeRow = ({ images, direction = 'left', speed = 40 }) => {
  // duplicate for seamless loop
  const items = [...images, ...images];
  return (
    <div className="marquee-row-wrapper">
      <div
        className={`marquee-row marquee-${direction}`}
        style={{ '--marquee-speed': `${speed}s` }}
      >
        {items.map((src, i) => (
          <div className="marquee-card" key={i}>
            <img src={src} alt={`spa-${i}`} loading="lazy" />
            <div className="marquee-card-overlay" />
          </div>
        ))}
      </div>
    </div>
  );
};

const MarqueeCol = ({ images, direction = 'up', speed = 30 }) => {
  const items = [...images, ...images];
  return (
    <div className="marquee-col-wrapper">
      <div
        className={`marquee-col marquee-col-${direction}`}
        style={{ '--marquee-speed': `${speed}s` }}
      >
        {items.map((src, i) => (
          <div className="marquee-card vertical" key={i}>
            <img src={src} alt={`spa-col-${i}`} loading="lazy" />
            <div className="marquee-card-overlay" />
          </div>
        ))}
      </div>
    </div>
  );
};

const GallerySection = () => {
  return (
    <section className="gallery-section section-padding">

      {/* ── Header ── */}
      <div className="container">
        <SectionTitle subtitle="Our Moments" title="Captured Serenity" />
        <p className="gallery-intro">
          Step inside our world — where every corner is designed for calm, every touch crafted for bliss.
        </p>
      </div>

      {/* ── Horizontal marquee rows ── */}
      <div className="marquee-block">
        <MarqueeRow images={row1} direction="left"  speed={35} />
        <MarqueeRow images={row2} direction="right" speed={28} />
      </div>

      {/* ── Divider label ── */}
      <div className="gallery-divider">
        <span className="divider-line" />
        <span className="divider-text">SIGNATURE SPACES</span>
        <span className="divider-line" />
      </div>

      {/* ── Vertical marquee columns + centre card ── */}
      <div className="marquee-cols-block">
        <MarqueeCol images={col1} direction="up"   speed={22} />

        <div className="gallery-centre-card">
          <img
            src="https://images.unsplash.com/photo-1552693673-1bf958298935?w=900&q=85"
            alt="Signature Treatment"
          />
          <div className="centre-card-content">
            <span className="centre-tag">Featured</span>
            <h3>Signature Rituals</h3>
            <p>Immerse yourself in our most sought-after treatments, curated for total renewal.</p>
          </div>
        </div>

        <MarqueeCol images={col2} direction="down" speed={22} />
      </div>

    </section>
  );
};

export default GallerySection;