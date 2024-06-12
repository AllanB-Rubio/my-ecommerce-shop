// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        setError("Failed to fetch product");
        console.error("Failed to fetch product", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...storedCart, { ...product, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setMessage("Product added to cart!");
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details-container">
      {message && <p className="message">{message}</p>}
      <img
        src={product.image}
        alt={product.name}
        className="product-details-image"
      />
      <div className="product-details-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="product-details-price">${product.price}</p>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
