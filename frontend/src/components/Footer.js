import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Café Fausse</h3>
          <p>Fine dining experience in the heart of Washington, DC</p>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>1234 Culinary Ave, Suite 100</p>
          <p>Washington, DC 20002</p>
          <p>(202) 555-4567</p>
        </div>
        
        <div className="footer-section">
          <h4>Hours</h4>
          <p>Monday - Saturday: 5:00 PM - 11:00 PM</p>
          <p>Sunday: 5:00 PM - 9:00 PM</p>
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Twitter">Twitter</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Café Fausse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
