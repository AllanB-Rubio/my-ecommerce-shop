import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const featuredProducts = [
    {
      id: 1,
      name: "Stylish Shirt",
      price: 19.99,
      description: "A very stylish shirt.",
      image: "/images/white-shirt-gradient.png",
    },
    {
      id: 2,
      name: "Casual T-Shirt",
      price: 19.99,
      description: "A very casual t-shirt.",
      image: "/images/dual.display-shirts.png",
    },
    {
      id: 3,
      name: "Comfy Sweater",
      price: 39.99,
      description: "A very comfy sweater.",
      image: "/images/sweatshirt-mockup.png",
    },
  ];

  const bestSellers = [
    {
      id: 4,
      name: "Dual Tone Hoodie",
      price: 34.99,
      description: "A very popular hoodie.",
      image: "/images/dual-tone-hoodie.jpeg",
    },
    {
      id: 5,
      name: "Top Rated T-Shirt",
      price: 24.99,
      description: "A top-rated t-shirt.",
      image: "/images/shirt-woman.png",
    },
    {
      id: 6,
      name: "Grayscale Edition Shirt",
      price: 44.99,
      description: "Oversized grayscale edition t-shirt.",
      image: "/images/white-tshirt.png",
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
      <section className="mission-statement">
        <h2>Our Mission</h2>
        <p>
          At Relentless Pursuit, our mission is to inspire and empower
          individuals to strive for their personal best in every facet of their
          lives. We are committed to providing high-quality, innovative athletic
          and lifestyle products that support and enhance the journey of
          relentless determination and unwavering dedication. Our brand stands
          for strength, resilience, and the relentless pursuit of excellence,
          encouraging our community to push boundaries, overcome challenges, and
          achieve their goals with passion and perseverance.
        </p>
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
