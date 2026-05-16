import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'sUpaAdmin' && password === 'pAsswOrd8934') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin-dashboard');
    } else {
      setError('Invalid login credentials. Please try again.');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <h2>Admin Login</h2>
        <p>Access the management dashboard</p>
        
        <form onSubmit={handleLogin}>
          {error && <div className="error-msg">{error}</div>}
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <Button type="submit" variant="dark">Login to Dashboard</Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
