// src/pages/OrderConfirmation.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        let response;
        if (user) {
          const token = localStorage.getItem("token");
          response = await axios.get(
            `http://localhost:3000/api/orders/${orderId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          response = await axios.get(
            `http://localhost:3000/api/orders/guest/${orderId}`
          );
        }
        setOrder(response.data);
      } catch (error) {
        console.error("Failed to fetch order", error);
        setError("Failed to fetch order");
      }
    };

    fetchOrder();
  }, [orderId, user]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-confirmation-container">
      <h1>Order Confirmation</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Order ID: {order.id}</p>
      <p>Total Amount: ${order.total_amount}</p>
      <p>Status: {order.status}</p>
      <h2>Items</h2>
      <ul>
        {order.items.map((item) => (
          <li key={item.id} className="order-item">
            <img
              src={item.image}
              alt={item.name}
              className="order-item-image"
            />
            <div className="order-item-details">
              <strong>{item.name}</strong>
              <span>Quantity: {item.quantity}</span>
              <span>Price: ${item.price}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderConfirmation;
