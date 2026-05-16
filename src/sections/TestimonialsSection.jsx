import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import SectionTitle from '../components/SectionTitle';
import { FaQuoteLeft } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/TestimonialsSection.css';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Fashion Designer',
    text: 'The aromatherapy session was life-changing. I left feeling completely renewed and balanced. Highly recommend Ese Luxury Spa!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Michael Chen',
    role: 'CEO',
    text: 'A true sanctuary in Lagos. The deep tissue massage was exactly what I needed after a stressful week. Professional and luxurious.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Amina Okoro',
    role: 'Yoga Instructor',
    text: 'The attention to detail and the serene atmosphere make this the best spa in Nigeria. Every visit is a special treat.',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  }
];

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section section-padding">
      <div className="container">
        <SectionTitle 
          subtitle="Testimonials" 
          title="What Our Clients Say" 
        />
        
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card">
                <div className="quote-icon"><FaQuoteLeft /></div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <img src={t.image} alt={t.name} />
                  <div className="author-info">
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
