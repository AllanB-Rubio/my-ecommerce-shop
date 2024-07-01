import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://my-ecommerce-shop-backend.onrender.com/api/products/${id}`
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
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details-container">
      {showMessage && (
        <div className="message">
          <p>{message}</p>
          <button onClick={handleViewCart}>View Cart</button>
          <button onClick={() => setShowMessage(false)}>
            Continue Shopping
          </button>
        </div>
      )}
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
