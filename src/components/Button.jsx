import React from 'react';
import '../styles/Button.css';

const Button = ({ children, variant = 'primary', onClick, type = 'button', className = '' }) => {
  return (
    <button 
      className={`btn btn-${variant} ${className}`} 
      onClick={onClick}
      type={type}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
