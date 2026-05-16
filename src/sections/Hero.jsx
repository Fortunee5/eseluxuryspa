import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from '../components/Button';
import '../styles/Hero.css';

const IMAGES = [
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80',
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1920&q=80',
  'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1920&q=80',
];

// Each function animates: current out, next in, calls onComplete when done
const TRANSITIONS = [
  // 0 → 1 : current zooms & fades, next slides in from the right
  (cur, nxt, done) => {
    gsap.set(nxt, { x: '100%', opacity: 1, scale: 1, y: 0 });
    const tl = gsap.timeline({ onComplete: done });
    tl.to(cur, { scale: 1.15, opacity: 0, duration: 1.4, ease: 'power2.inOut' }, 0)
      .to(nxt, { x: '0%',                duration: 1.4, ease: 'power2.inOut' }, 0);
  },
  // 1 → 2 : crossfade with a gentle scale bloom
  (cur, nxt, done) => {
    gsap.set(nxt, { opacity: 0, scale: 1.12, x: 0, y: 0 });
    const tl = gsap.timeline({ onComplete: done });
    tl.to(cur, { opacity: 0,              duration: 1.4, ease: 'power1.inOut' }, 0)
      .to(nxt, { opacity: 1, scale: 1,    duration: 1.4, ease: 'power1.inOut' }, 0);
  },
  // 2 → 0 : current drifts up & out, next rises from below
  (cur, nxt, done) => {
    gsap.set(nxt, { y: '100%', opacity: 1, scale: 1, x: 0 });
    const tl = gsap.timeline({ onComplete: done });
    tl.to(cur, { y: '-25%', opacity: 0, duration: 1.4, ease: 'power2.inOut' }, 0)
      .to(nxt, { y: '0%',               duration: 1.4, ease: 'power2.inOut' }, 0);
  },
];

const Hero = () => {
  const heroRef      = useRef(null);
  const titleRef     = useRef(null);
  const subRef       = useRef(null);
  const btnRef       = useRef(null);
  const scrollRef    = useRef(null);
  const imgRefs      = useRef([]);
  const currentIndex = useRef(0);
  const timerRef     = useRef(null);

  useEffect(() => {
    const imgs = imgRefs.current;

    /* ── initial image states ── */
    imgs.forEach((img, i) => {
      gsap.set(img, { opacity: i === 0 ? 1 : 0, x: 0, y: 0, scale: 1 });
    });

    /* ── Ken Burns on first slide ── */
    gsap.to(imgs[0], { scale: 1.08, duration: 7, ease: 'none' });

    /* ── content entrance ── */
    gsap.timeline()
      .fromTo(subRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.4, ease: 'power2.out' })
      .fromTo(titleRef.current,
        { opacity: 0, y: 55 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.4')
      .fromTo(btnRef.current,
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.5')
      .fromTo(scrollRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3');

    /* ── scroll-line pulse ── */
    gsap.to('.scroll-indicator .line', {
      scaleY: 0.3, transformOrigin: 'top center',
      repeat: -1, yoyo: true, duration: 1.2, ease: 'power1.inOut',
    });

    /* ── slideshow loop ── */
    const advance = () => {
      const ci  = currentIndex.current;
      const ni  = (ci + 1) % IMAGES.length;

      TRANSITIONS[ci](imgs[ci], imgs[ni], () => {
        currentIndex.current = ni;
        // Ken Burns on the freshly visible slide
        gsap.fromTo(imgs[ni], { scale: 1 }, { scale: 1.08, duration: 7, ease: 'none' });
        timerRef.current = setTimeout(advance, 5000);
      });
    };

    timerRef.current = setTimeout(advance, 5000);
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-overlay" />

      <div className="hero-video">
        {IMAGES.map((src, i) => (
          <img
            key={i}
            ref={el => (imgRefs.current[i] = el)}
            src={src}
            alt={`Luxury Spa Slide ${i + 1}`}
            className="parallax-bg"
          />
        ))}
      </div>

      <div className="container hero-content">
        <span ref={subRef} className="hero-subtitle">Welcome to Ese Luxury Spa</span>
        <h1 ref={titleRef}>
          The Ultimate Spa <br />
          <span>Experience In Accra Ghana</span>
        </h1>
        <div ref={btnRef} className="hero-btns">
          <Button onClick={() => window.location.href = '/booking'}>Book Appointment</Button>
          <Button variant="outline" onClick={() => window.location.href = '/services'}>Explore Services</Button>
        </div>
      </div>

      <div className="scroll-indicator" ref={scrollRef}>
        <span>SCROLL</span>
        <div className="line" />
      </div>
    </section>
  );
};

export default Hero;