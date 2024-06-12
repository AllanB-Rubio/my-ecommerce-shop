import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const featuredProducts = [
    {
      id: 1,
      name: "Stylish Shirt",
      price: 29.99,
      description: "A very stylish shirt.",
      image: "/images/shirt.jpg",
    },
    {
      id: 2,
      name: "Casual T-Shirt",
      price: 19.99,
      description: "A very casual t-shirt.",
      image: "/images/shirt.jpg",
    },
    {
      id: 3,
      name: "Formal Shirt",
      price: 39.99,
      description: "A very formal shirt.",
      image: "/images/shirt.jpg",
    },
  ];

  const bestSellers = [
    {
      id: 4,
      name: "Best Seller Shirt",
      price: 34.99,
      description: "A very popular shirt.",
      image: "/images/best-sellers.jpg",
    },
    {
      id: 5,
      name: "Top Rated T-Shirt",
      price: 24.99,
      description: "A top-rated t-shirt.",
      image: "/images/best-sellers.jpg",
    },
    {
      id: 6,
      name: "Famous Formal Shirt",
      price: 44.99,
      description: "A famous formal shirt.",
      image: "/images/best-sellers.jpg",
    },
  ];

  const newArrivals = [
    {
      id: 7,
      name: "New Arrival Shirt",
      price: 29.99,
      description: "A stylish new arrival shirt.",
      image: "/images/new-arrival.jpg",
    },
    {
      id: 8,
      name: "Latest T-Shirt",
      price: 19.99,
      description: "The latest in fashion t-shirts.",
      image: "/images/new-arrival.jpg",
    },
    {
      id: 9,
      name: "Brand New Formal Shirt",
      price: 39.99,
      description: "A brand new formal shirt.",
      image: "/images/new-arrival.jpg",
    },
  ];

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="container">
      <section className="hero">
        <img src="/images/hero.jpg" alt="Hero" />
      </section>
      <section className="section">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product.id)}
            >
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <h2>Best Sellers</h2>
        <div className="product-grid">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product.id)}
            >
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <h2>New Arrivals</h2>
        <div className="product-grid">
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product.id)}
            >
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
