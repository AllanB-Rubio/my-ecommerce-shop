// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-title">My Store</div>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/best-sellers" className="navbar-link">
            Best Sellers
          </Link>
          <Link to="/mens" className="navbar-link">
            Men's
          </Link>
          <Link to="/womens" className="navbar-link">
            Women's
          </Link>
          <Link to="/accessories" className="navbar-link">
            Accessories
          </Link>
          <Link to="/contact" className="navbar-link">
            Contact
          </Link>
          <Link to="/account" className="navbar-link">
            Account
          </Link>
          <Link to="/cart" className="navbar-link">
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
