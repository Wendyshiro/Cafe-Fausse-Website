import React, { useState } from 'react';
import '../styles/Home.css';

const Home = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Thank you for subscribing to our newsletter!');
        setEmail('');
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Café Fausse</h1>
          <p>An unforgettable fine dining experience</p>
          <a href="/reservations" className="cta-button">Make a Reservation</a>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome">
        <div className="container">
          <h2>Welcome to Café Fausse</h2>
          <p>
            Experience the perfect blend of traditional Italian flavors and modern culinary innovation. 
            Our commitment to quality and creativity ensures every visit is memorable.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <h3>Location</h3>
              <p>1234 Culinary Ave, Suite 100</p>
              <p>Washington, DC 20002</p>
            </div>
            <div className="info-card">
              <h3>Phone</h3>
              <p>(202) 555-4567</p>
            </div>
            <div className="info-card">
              <h3>Hours</h3>
              <p>Monday - Saturday: 5:00 PM - 11:00 PM</p>
              <p>Sunday: 5:00 PM - 9:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter">
        <div className="container">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for special offers and events</p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </section>
    </div>
  );
};

export default Home;
