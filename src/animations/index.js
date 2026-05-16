import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fadeIn = (element, delay = 0) => {
  gsap.fromTo(element, 
    { opacity: 0, y: 30 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1, 
      delay,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
      }
    }
  );
};

export const staggerFadeIn = (elements, stagger = 0.2) => {
  gsap.fromTo(elements, 
    { opacity: 0, y: 30 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1, 
      stagger,
      scrollTrigger: {
        trigger: elements[0],
        start: 'top 85%',
      }
    }
  );
};
