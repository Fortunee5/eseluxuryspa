import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/SectionTitle.css';

gsap.registerPlugin(ScrollTrigger);

const SectionTitle = ({ subtitle, title, align = 'center' }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <div className={`section-title ${align}`} ref={titleRef}>
      <span className="subtitle">{subtitle}</span>
      <h2>{title}</h2>
      <div className="title-separator">
        <span></span>
        <div className="dot"></div>
        <span></span>
      </div>
    </div>
  );
};

export default SectionTitle;
