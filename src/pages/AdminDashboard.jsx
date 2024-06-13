// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const response = await axios.get(
          "http://localhost:3000/api/products",
          config
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout} className="admin-logout-button">
        Logout
      </button>
      <Link to="/admin/add-product" className="admin-add-product-button">
        Add Product
      </Link>
      <table className="admin-product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.SKU}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <Link
                  to={`/admin/edit-product/${product.id}`}
                  className="admin-edit-button"
                >
                  Edit
                </Link>
                <button className="admin-delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
