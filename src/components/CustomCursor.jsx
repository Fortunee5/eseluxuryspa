import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', moveCursor);

    const handleHover = () => {
      gsap.to(followerRef.current, {
        scale: 2.5,
        backgroundColor: 'rgba(200, 169, 126, 0.3)',
        border: 'none',
      });
    };

    const handleUnhover = () => {
      gsap.to(followerRef.current, {
        scale: 1,
        backgroundColor: 'transparent',
        border: '1px solid var(--color-gold)',
      });
    };

    const links = document.querySelectorAll('a, button, .hover-target');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleHover);
      link.addEventListener('mouseleave', handleUnhover);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={followerRef} className="cursor-follower"></div>
    </>
  );
};

export default CustomCursor;
