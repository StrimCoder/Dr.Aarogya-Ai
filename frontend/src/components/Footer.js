import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Dr. Aarogya AI</h3>
          <p>Your AI-powered health companion for personalized healthcare insights.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@draarogya.ai</p>
          <p>Phone: +91 1234567890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Dr. Aarogya AI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;