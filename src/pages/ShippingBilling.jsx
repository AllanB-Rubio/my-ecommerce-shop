// src/pages/ShippingBilling.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./ShippingBilling.css";

const ShippingBilling = () => {
  const [shipping, setShipping] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [billing, setBilling] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("guest") === "true") {
      setIsGuest(true);
    }
  }, [location.search]);

  const handleInputChange = (e, setFunction) => {
    const { name, value } = e.target;
    setFunction((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setSameAsShipping((prev) => !prev);
    if (!sameAsShipping) {
      setBilling(shipping);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        items: JSON.parse(localStorage.getItem("cart")) || [],
        totalAmount: JSON.parse(localStorage.getItem("cart")).reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        shipping,
        billing: sameAsShipping ? shipping : billing,
      };

      if (isGuest) {
        // Remove any headers for guest checkout
        const response = await axios.post(
          "http://localhost:3000/api/orders/guest",
          orderData
        );
        navigate(`/order-confirmation/${response.data.id}`);
      } else {
        const token = localStorage.getItem("token");
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

      localStorage.removeItem("cart"); // Clear the cart after placing the order
    } catch (error) {
      console.error("Failed to save addresses or create order", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="shipping-billing-form">
      <h2>Shipping Address</h2>
      <div className="form-group">
        <input
          type="text"
          name="addressLine1"
          placeholder="Address Line 1"
          value={shipping.addressLine1}
          onChange={(e) => handleInputChange(e, setShipping)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="addressLine2"
          placeholder="Address Line 2"
          value={shipping.addressLine2}
          onChange={(e) => handleInputChange(e, setShipping)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shipping.city}
          onChange={(e) => handleInputChange(e, setShipping)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="state"
          placeholder="State"
          value={shipping.state}
          onChange={(e) => handleInputChange(e, setShipping)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={shipping.postalCode}
          onChange={(e) => handleInputChange(e, setShipping)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={shipping.country}
          onChange={(e) => handleInputChange(e, setShipping)}
          required
        />
      </div>

      <h2>Billing Address</h2>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={sameAsShipping}
          onChange={handleCheckboxChange}
        />
        Same as shipping address
      </label>
      {!sameAsShipping && (
        <>
          <div className="form-group">
            <input
              type="text"
              name="addressLine1"
              placeholder="Address Line 1"
              value={billing.addressLine1}
              onChange={(e) => handleInputChange(e, setBilling)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="addressLine2"
              placeholder="Address Line 2"
              value={billing.addressLine2}
              onChange={(e) => handleInputChange(e, setBilling)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={billing.city}
              onChange={(e) => handleInputChange(e, setBilling)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="state"
              placeholder="State"
              value={billing.state}
              onChange={(e) => handleInputChange(e, setBilling)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={billing.postalCode}
              onChange={(e) => handleInputChange(e, setBilling)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={billing.country}
              onChange={(e) => handleInputChange(e, setBilling)}
              required
            />
          </div>
        </>
      )}

      <button type="submit" className="submit-button">
        Place Order
      </button>
    </form>
  );
};

export default ShippingBilling;
