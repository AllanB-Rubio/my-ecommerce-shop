import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const featuredProducts = [
    {
      id: 1,
      name: "Relentless Dual Color Gradient Edition Shirt",
      price: 19.99,
      description: "A very stylish soft shirt.",
      image: "/images/white-shirt-gradient.png",
    },
    {
      id: 2,
      name: "Relentless 2-Pack Black and White",
      price: 29.99,
      description: "2-Pack Special Black and White edition shirts.",
      image: "/images/dual.display-shirts.png",
    },
    {
      id: 3,
      name: "Relentless White Sweater",
      price: 39.99,
      description: "A very comfy sweater.",
      image: "/images/sweatshirt-mockup.png",
    },
  ];

  const bestSellers = [
    {
      id: 4,
      name: "Relentless Dual Tone Hoodie",
      price: 34.99,
      description: "Our best seller and most popular hoodie.",
      image: "/images/dual-tone-hoodie.jpeg",
    },
    {
      id: 5,
      name: "Womans Gradient T-Shirt",
      price: 24.99,
      description: "A loose fit dual tone t-shirt.",
      image: "/images/shirt-woman.png",
    },
    {
      id: 6,
      name: "Relentless Grayscale Edition Shirt",
      price: 24.99,
      description: "Oversized grayscale edition t-shirt.",
      image: "/images/white-tshirt.png",
    },
  ];

  const newArrivals = [
    {
      id: 7,
      name: "Relentless Jacket Minimal",
      price: 39.99,
      description: "A stylish black jacket.",
      image: "/images/closeup-jacket-mockup.jpg",
    },
    {
      id: 8,
      name: "Relentless Sweater Expanded",
      price: 39.99,
      description: "Relentless Sweater with expanded logo in the back.",
      image: "/images/jacket-mockup-mannequin.jpg",
    },
    {
      id: 9,
      name: "Relentless Beanie V1.0",
      price: 24.99,
      description: "Warm and cozy black beanie.",
      image: "/images/black.beanie.jpg",
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
