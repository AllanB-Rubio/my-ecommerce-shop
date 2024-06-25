// src/components/NavBar.jsx
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img
              src="/images/all-white.logo.rp.png"
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
          {user && (
            <button className="navbar-link" onClick={logout}>
              Logout
            </button>
          )}
        </div>
        <button className="navbar-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
