import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flexDirection: 'column', gap: '20px'}}>
      <h1 style={{fontSize: '120px', color: 'var(--color-gold)'}}>404</h1>
      <h2>Page Not Found</h2>
      <p>The sanctuary you are looking for does not exist or has been moved.</p>
      <Link to="/"><Button variant="dark">Return Home</Button></Link>
    </div>
  );
};

export default NotFound;
