// src/pages/ShoppingCart.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleQuantityChange = (index, quantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = quantity;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemove = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    // Mock checkout process
    const orderNumber = `ORD-${Math.floor(Math.random() * 1000000)}`;
    setCart([]);
    localStorage.removeItem("cart");
    navigate(`/checkout/${orderNumber}`);
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-image"
                  />
                  {item.name}
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(index, Number(e.target.value))
                    }
                  />
                </td>
                <td>${item.price}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => handleRemove(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {cart.length > 0 && (
        <button onClick={handleCheckout} className="checkout-button">
          Checkout
        </button>
      )}
    </div>
  );
};

export default ShoppingCart;
