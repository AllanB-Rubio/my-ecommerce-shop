import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
      const token = localStorage.getItem("token");
      const addressResponse = await axios.post(
        "http://localhost:3000/api/addresses",
        { shipping, billing: sameAsShipping ? shipping : billing },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalAmount = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const orderData = {
        items: cart,
        totalAmount,
      };

      const orderResponse = await axios.post(
        "http://localhost:3000/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("cart"); // Clear the cart after placing the order
      navigate(`/order-confirmation/${orderResponse.data.id}`);
    } catch (error) {
      console.error("Failed to save addresses or create order", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="shipping-billing-form">
      <h2>Shipping Address</h2>
      <input
        type="text"
        name="addressLine1"
        placeholder="Address Line 1"
        value={shipping.addressLine1}
        onChange={(e) => handleInputChange(e, setShipping)}
        required
      />
      <input
        type="text"
        name="addressLine2"
        placeholder="Address Line 2"
        value={shipping.addressLine2}
        onChange={(e) => handleInputChange(e, setShipping)}
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={shipping.city}
        onChange={(e) => handleInputChange(e, setShipping)}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={shipping.state}
        onChange={(e) => handleInputChange(e, setShipping)}
        required
      />
      <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        value={shipping.postalCode}
        onChange={(e) => handleInputChange(e, setShipping)}
        required
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={shipping.country}
        onChange={(e) => handleInputChange(e, setShipping)}
        required
      />

      <h2>Billing Address</h2>
      <label>
        <input
          type="checkbox"
          checked={sameAsShipping}
          onChange={handleCheckboxChange}
        />
        Same as shipping address
      </label>
      {!sameAsShipping && (
        <>
          <input
            type="text"
            name="addressLine1"
            placeholder="Address Line 1"
            value={billing.addressLine1}
            onChange={(e) => handleInputChange(e, setBilling)}
            required
          />
          <input
            type="text"
            name="addressLine2"
            placeholder="Address Line 2"
            value={billing.addressLine2}
            onChange={(e) => handleInputChange(e, setBilling)}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={billing.city}
            onChange={(e) => handleInputChange(e, setBilling)}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={billing.state}
            onChange={(e) => handleInputChange(e, setBilling)}
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={billing.postalCode}
            onChange={(e) => handleInputChange(e, setBilling)}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={billing.country}
            onChange={(e) => handleInputChange(e, setBilling)}
            required
          />
        </>
      )}

      <button type="submit">Place Order</button>
    </form>
  );
};

export default ShippingBilling;
