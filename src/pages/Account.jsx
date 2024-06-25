// src/pages/Account.jsx
import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./Account.css";

const Account = () => {
  const { user, login, register } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(
    searchParams.get("isLogin") === "true"
  );
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [orders, setOrders] = useState([]);
  const [logoutSuccess, setLogoutSuccess] = useState("");

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/orders/user/orders",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      setSuccess("Login successful!");
      setError("");
      setLogoutSuccess(""); // Clear logout success message on login
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login failed", error.response || error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      setIsLogin(true);
      setSuccess("Account created successfully!");
      setError("");
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration failed", error.response || error);
    }
  };

  if (user) {
    return (
      <div className="account-container">
        <h1>Account</h1>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        {success && <p className="success-message">{success}</p>}
        <h2>Recent Orders</h2>
        {orders.length > 0 ? (
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>${order.total_amount}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>
                    {order.items.map((item) => (
                      <div key={item.id}>
                        {item.name} - {item.quantity} x ${item.price}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No recent orders</p>
        )}
      </div>
    );
  }

  return (
    <div className="auth-container">
      {logoutSuccess && <p className="success-message">{logoutSuccess}</p>}
      {isLogin ? (
        <form onSubmit={handleLogin} className="auth-form">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Login</button>
          <p>
            Don't have an account?{" "}
            <span onClick={() => setIsLogin(false)} className="auth-toggle">
              Register here
            </span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="auth-form">
          <h2>Register</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          <button type="submit">Register</button>
          <p>
            Already have an account?{" "}
            <span onClick={() => setIsLogin(true)} className="auth-toggle">
              Login here
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Account;
