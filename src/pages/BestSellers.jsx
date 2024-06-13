import React from "react";
import "./BestSellers.css";

const bestSellers = [
  {
    id: "1",
    name: "Popular Shirt",
    price: 29.99,
    description: "A very popular shirt.",
    image: "/images/shirt1.jpg",
  },
  {
    id: "2",
    name: "Trendy T-Shirt",
    price: 19.99,
    description: "A trendy t-shirt.",
    image: "/images/shirt2.jpg",
  },
  {
    id: "3",
    name: "Classic Formal Shirt",
    price: 39.99,
    description: "A classic formal shirt.",
    image: "/images/shirt3.jpg",
  },
  {
    id: "4",
    name: "Summer T-Shirt",
    price: 24.99,
    description: "Perfect for the summer.",
    image: "/images/shirt4.jpg",
  },
  {
    id: "5",
    name: "Elegant Shirt",
    price: 34.99,
    description: "An elegant shirt.",
    image: "/images/shirt5.jpg",
  },
  {
    id: "6",
    name: "Casual Shirt",
    price: 22.99,
    description: "A casual shirt for everyday wear.",
    image: "/images/shirt6.jpg",
  },
];

const BestSellers = () => {
  return (
    <div className="best-sellers-container">
      <h2>Best Sellers</h2>
      <div className="best-sellers-grid">
        {bestSellers.map((product) => (
          <div key={product.id} className="best-seller-card">
            {/* <img src={product.image} alt={product.name} /> */}
            <img
              src="https://via.placeholder.com/300"
              alt="Placeholder Image" // temporary
            />

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
