import React from "react";
import { Link } from "react-router-dom";
import "./ThankYou.css";

const ThankYou = () => {
  return (
    <div className="thank-you-container">
      <h1>Thank You!</h1>
      <p>Your message has been sent. We will get back to you shortly.</p>
      <Link to="/" className="thank-you-home-link">
        Return to Home
      </Link>
    </div>
  );
};

export default ThankYou;
