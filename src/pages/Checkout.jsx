// src/pages/Checkout.jsx
import React from "react";
import { useParams } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const { orderNumber } = useParams();

  return (
    <div className="checkout-container">
      <h1>Order Confirmation</h1>
      <p>Your order number is: {orderNumber}</p>
      <p>Thank you for your purchase!</p>
    </div>
  );
};

export default Checkout;
