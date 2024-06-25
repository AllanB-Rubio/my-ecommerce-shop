// src/pages/CheckoutOptions.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutOptions.css";

const CheckoutOptions = () => {
  const navigate = useNavigate();

  const handleGuestCheckout = () => {
    navigate("/shipping-billing?guest=true");
  };

  return (
    <div className="checkout-options-container">
      <h1>Checkout Options</h1>
      <p>Please choose an option to proceed with your checkout:</p>
      <div className="checkout-buttons">
        <button onClick={() => navigate("/account?form=login")}>Login</button>
        <button onClick={() => navigate("/account?form=register")}>
          Register
        </button>
        <button onClick={handleGuestCheckout}>Checkout as Guest</button>
      </div>
    </div>
  );
};

export default CheckoutOptions;
