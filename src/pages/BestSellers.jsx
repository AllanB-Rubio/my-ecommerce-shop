import React from "react";
import { useNavigate } from "react-router-dom";
import "./BestSellers.css";

const bestSellers = [
  {
    id: "1",
    name: "Relentless Dual Color Gradient Edition Shirt",
    price: 29.99,
    description: "A very stylish soft shirt.",
    image: "/images/white-shirt-gradient.png",
  },
  {
    id: "2",
    name: "Trendy T-Shirt",
    price: 19.99,
    description: "A trendy t-shirt.",
    image: "/images/dual.display-shirts.png",
  },
  {
    id: "3",
    name: "Classic Formal Shirt",
    price: 39.99,
    description: "A classic formal shirt.",
    image: "/images/sweatshirt-mockup.png",
  },
  {
    id: "4",
    name: "Summer T-Shirt",
    price: 24.99,
    description: "Perfect for the summer.",
    image: "/images/black-white-hoodie.png",
  },
  {
    id: "5",
    name: "Elegant Shirt",
    price: 34.99,
    description: "An elegant shirt.",
    image: "/images/shirt-woman.png",
  },
  {
    id: "6",
    name: "Casual Shirt",
    price: 22.99,
    description: "A casual shirt for everyday wear.",
    image: "/images/white-tshirt.png", // Updated image path
  },
];

const BestSellers = () => {
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="best-sellers-container">
      <h2>Best Sellers</h2>
      <div className="best-sellers-grid">
        {bestSellers.map((product) => (
          <div
            key={product.id}
            className="best-seller-card"
            onClick={() => handleProductClick(product.id)}
          >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="best-seller-price">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
