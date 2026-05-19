import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Layouts & Components
// @ts-ignore - Temporary bypass if your components are still .jsx
import Navbar from './components/Navbar';
// @ts-ignore
import Footer from './components/Footer';
// @ts-ignore
import CustomCursor from './components/CustomCursor';
// @ts-ignore
import BookingPopup from './components/BookingPopup';
// @ts-ignore
import useLenis from './hooks/useLenis';

// Pages
// @ts-ignore
import Home from './pages/Home';
// @ts-ignore
import About from './pages/About';
// @ts-ignore
import Services from './pages/Services';
// @ts-ignore
import Gallery from './pages/Gallery';
// @ts-ignore
import Pricing from './pages/Pricing';
// @ts-ignore
import Blog from './pages/Blog';
// @ts-ignore
import Contact from './pages/Contact';
// @ts-ignore
import Booking from './pages/Booking';
// @ts-ignore
import AdminLogin from './pages/AdminLogin';
// @ts-ignore
import AdminDashboard from './pages/AdminDashboard';
// @ts-ignore
import NotFound from './pages/NotFound';

// Styles
import './styles/global.css';

const ScrollToTop: React.FC = (): null => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

function App(): React.JSX.Element {
  // Call your custom Lenis smooth scroll hook
  useLenis();

  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      <Navbar />
      
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
