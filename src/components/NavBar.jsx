// src/components/NavBar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img
              src="/images/relentless.pursuit.svg"
              alt="Relentless Pursuit"
              className="navbar-image"
            />
          </Link>
        </div>
        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          <Link to="/" className="navbar-link" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link
            to="/best-sellers"
            className="navbar-link"
            onClick={() => setIsOpen(false)}
          >
            Best Sellers
          </Link>
          <Link
            to="/mens"
            className="navbar-link"
            onClick={() => setIsOpen(false)}
          >
            Men's
          </Link>
          <Link
            to="/womens"
            className="navbar-link"
            onClick={() => setIsOpen(false)}
          >
            Women's
          </Link>
          <Link
            to="/contact"
            className="navbar-link"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/account"
            className="navbar-link"
            onClick={() => setIsOpen(false)}
          >
            Account
          </Link>
          <Link
            to="/cart"
            className="navbar-link"
            onClick={() => setIsOpen(false)}
          >
            Cart
          </Link>
        </div>
        <button className="navbar-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
