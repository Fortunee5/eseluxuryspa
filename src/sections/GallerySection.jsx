import React, { useRef, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import '../styles/GallerySection.css';
import img1 from '../images/1.jpeg';
import img2 from '../images/2.jpeg';
import img3 from '../images/3.jpeg';
import img4 from '../images/4.jpeg';
import img5 from '../images/5.jpeg';
import img6 from '../images/6.jpeg';
import img7 from '../images/7.jpeg';
import img8 from '../images/8.jpeg';
import img9 from '../images/9.jpeg';
import img10 from '../images/10.jpeg';
import img43 from '../images/43.jpeg';

import img21 from '../images/gh1.jpeg';
import img22 from '../images/gh2.jpeg';

import img23 from '../images/gh3.jpeg';
import img24 from '../images/gh4.jpeg';
import img25 from '../images/gh5.jpeg';
import img26 from '../images/gh6.jpeg';
import img27 from '../images/gh7.jpeg';
import img28 from '../images/gh8.jpeg';
import img29 from '../images/gh9.jpeg';
import img30 from '../images/gh10.jpeg';

import img31 from '../images/gh11.jpeg';
import img32 from '../images/gh12.jpeg';
import img33 from '../images/gh13.jpeg';
import img34 from '../images/gh14.jpeg';

const row1 = [
img23,
img24,
img25,
img26,
img27,
img28,
img29,
img30,

];

const row2 = [
img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img43,
  
];

const col1 = [
img23,
img24,
img25,
img26,
img27,
img28,
img29,
img30,
];

const col2 = [
img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img43,
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
            src={img22}
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