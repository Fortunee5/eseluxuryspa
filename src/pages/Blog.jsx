import React from 'react';
import SectionTitle from '../components/SectionTitle';
import img31 from '../images/gh11.jpeg';
import img32 from '../images/gh12.jpeg';
import img33 from '../images/gh13.jpeg';
import img34 from '../images/gh14.jpeg';

const blogPosts = [
  {
    title: 'Natural Glow',
    date: null,
    image: img31,
    excerpt: null
  },
  {
    title: 'Natural Glow',
    date: null,
    image: img32,
    excerpt: null
  },
  {
    title: 'Natural Glow',
    date: null,
    image: img34,
    excerpt: null
  }
];

const Blog = () => {
  return (
    <div className="pt-navbar">
      <div className="page-header section-padding" style={{backgroundColor: 'var(--color-dark-charcoal)', color: 'white', textAlign: 'center'}}>
        <div className="container">
          <h1 style={{color: 'white', fontSize: '48px'}}>Natural Glow Products</h1>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
