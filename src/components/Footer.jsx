// src/components/Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h3>About Us</h3>
          <p>
            Relentless Pursuit is a lifestyle brand dedicated to providing
            high-quality activewear for your everyday needs. Our mission is to
            inspire you to reach beyond your limits.
          </p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/best-sellers">Best Sellers</a>
            </li>
            <li>
              <a href="/mens">Men's</a>
            </li>
            <li>
              <a href="/womens">Women's</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/account">Account</a>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: support@relentlesspursuit.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Relentless Pursuit. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
