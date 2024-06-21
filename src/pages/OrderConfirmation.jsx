// src/pages/OrderConfirmation.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrder(response.data);
      } catch (error) {
        console.error("Failed to fetch order", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-confirmation-container">
      <h1>Order Confirmation</h1>
      <p>Order ID: {order.id}</p>
      <p>Total Amount: ${order.total_amount}</p>
      <p>Status: {order.status}</p>
      <h2>Items</h2>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>
            <img
              src={item.image}
              alt={item.name}
              className="order-item-thumbnail"
            />
            {item.name} - {item.quantity} x ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderConfirmation;
