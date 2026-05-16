import React from 'react';
import SectionTitle from '../components/SectionTitle';

const blogPosts = [
  {
    title: '5 Benefits of Aromatherapy',
    date: 'March 15, 2024',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    excerpt: 'Discover how essential oils can transform your mental and physical state...'
  },
  {
    title: 'The Art of Deep Tissue Massage',
    date: 'March 10, 2024',
    image: 'https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    excerpt: 'Understand the science behind muscle recovery and tension release...'
  },
  {
    title: 'Hydration: The Key to Glowing Skin',
    date: 'March 05, 2024',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    excerpt: 'Why drinking water is just the beginning of your skincare journey...'
  }
];

const Blog = () => {
  return (
    <div className="pt-navbar">
      <div className="page-header section-padding" style={{backgroundColor: 'var(--color-dark-charcoal)', color: 'white', textAlign: 'center'}}>
        <div className="container">
          <h1 style={{color: 'white', fontSize: '48px'}}>Wellness Blog</h1>
          <p style={{color: 'var(--color-gold)', marginTop: '10px', letterSpacing: '2px', textTransform: 'uppercase'}}>Insights for your journey</p>
        </div>
      </div>
      
      <div className="container section-padding">
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
          {blogPosts.map((post, index) => (
            <div key={index} className="blog-card" style={{backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'}}>
              <img src={post.image} alt={post.title} style={{width: '100%', height: '250px', objectFit: 'cover'}} />
              <div style={{padding: '30px'}}>
                <span style={{color: 'var(--color-gold)', fontSize: '12px', textTransform: 'uppercase'}}>{post.date}</span>
                <h3 style={{margin: '10px 0 15px', fontSize: '22px'}}>{post.title}</h3>
                <p style={{color: '#666', marginBottom: '20px', fontSize: '15px'}}>{post.excerpt}</p>
                <a href="#" style={{color: 'var(--color-dark-charcoal)', fontWeight: '600', textTransform: 'uppercase', fontSize: '13px', letterSpacing: '1px'}}>Read More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
