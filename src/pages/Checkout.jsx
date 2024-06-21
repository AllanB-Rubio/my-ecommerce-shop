// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    const params = new URLSearchParams(location.search);
    if (params.get("guest") === "true") {
      setIsGuest(true);
    }
  }, [location.search]);

  const handleOrder = async () => {
    try {
      const orderData = {
        items: cart,
        total_amount: cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      };

      if (isGuest) {
        const response = await axios.post(
          "http://localhost:3000/api/orders/guest",
          orderData
        );
        navigate(`/order-confirmation/${response.data.id}`);
      } else {
        const token = localStorage.getItem("token");
        const userId = JSON.parse(atob(token.split(".")[1])).id; // Decode JWT to get userId
        orderData.userId = userId;
        const response = await axios.post(
          "http://localhost:3000/api/orders",
          orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate(`/order-confirmation/${response.data.id}`);
      }

      // Clear cart after order is placed
      setCart([]);
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Failed to place order", error);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
