import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import '../styles/AboutSection.css';
import img21 from '../images/gh1.jpeg';
const stats = [
  { target: 10,   suffix: '+',  label: 'Years of Experience' },
  { target: 60,   suffix: '+',  label: 'Luxury Treatments' },
  { target: 7000, suffix: '+',  label: 'Happy Clients', display: (v) => `${Math.floor(v / 1000)}k` },
];

const AboutSection = () => {
  const featuresRef = useRef(null);
  const numRefs     = useRef([]);
  const animated    = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;

          stats.forEach((stat, i) => {
            const el  = numRefs.current[i];
            const obj = { val: 0 };

            gsap.to(obj, {
              val: stat.target,
              duration: 2,
              ease: 'power2.out',
              delay: i * 0.15,
              onUpdate: () => {
                const formatted = stat.display
                  ? stat.display(obj.val)
                  : Math.floor(obj.val);
                el.textContent = formatted + stat.suffix;
              },
            });
          });
        }
      },
      { threshold: 0.4 }
    );

    if (featuresRef.current) observer.observe(featuresRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section section-padding">
      <div className="container">
        <div className="about-grid">
          <div className="about-images">
            <div className="img-large">
              <img src={img21} alt="Spa Scene" />
            </div>
            <div className="img-small floating">
              <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxEME9M9cSy9FvfHvcx2gMPkp1H5Dj4YaKufPRsAyon8Tf" alt="Spa Detail" />
            </div>
          </div>

          <div className="about-content">
            <SectionTitle
              subtitle="The Story Of Our Spa"
              title="A Sanctuary For Your Mind, Body & Soul"
              align="left"
            />
            <p>At Ese Luxury Spa, we believe that wellness is a journey, not a destination. Located in the heart of Lagos, our sanctuary offers a serene escape from the hustle and bustle of city life.</p>
            <p>Our expert therapists are dedicated to providing personalized treatments that combine ancient traditions with modern techniques. From therapeutic massages to revitalizing facials, every experience is designed to restore balance and harmony.</p>

            <div className="about-features" ref={featuresRef}>
              {stats.map((stat, i) => (
                <div className="feature-item" key={i}>
                  <span
                    className="feature-number"
                    ref={el => (numRefs.current[i] = el)}
                  >
                    0{stat.suffix}
                  </span>
                  <span className="feature-text">{stat.label}</span>
                </div>
              ))}
            </div>

            <Button onClick={() => window.location.href = '/about'}>Discover More</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;