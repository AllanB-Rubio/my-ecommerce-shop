import React from "react";
import { useNavigate } from "react-router-dom";
import "./BestSellers.css";

const bestSellers = [
  {
    id: "1",
    name: "Relentless Dual Color Gradient Edition Shirt",
    price: 19.99,
    description: "A very stylish soft shirt.",
    image: "/images/white-shirt-gradient.png",
  },
  {
    id: "2",
    name: "Relentless 2-Pack Black and White",
    price: 19.99,
    description: "2-Pack Special Black and White edition shirts.",
    image: "/images/dual.display-shirts.png",
  },
  {
    id: "3",
    name: "Relentless White Sweater",
    price: 39.99,
    description: "A very comfy sweater.",
    image: "/images/sweatshirt-mockup.png",
  },
  {
    id: "4",
    name: "Relentless Dual Tone Hoodie",
    price: 24.99,
    description: "Our best seller and most popular hoodie.",
    image: "/images/dual-tone-hoodie.jpeg",
  },
  {
    id: "5",
    name: "Womans Gradient T-Shirt",
    price: 24.99,
    description: "A loose fit dual tone t-shirt.",
    image: "/images/shirt-woman.png",
  },
  {
    id: "6",
    name: "Grayscale Edition Shirt",
    price: 22.99,
    description: "Minimal Grayscale Edition Shirt.",
    image: "/images/white-tshirt.png",
  },
  {
    id: "7",
    name: "Relentless Jacket",
    price: 39.99,
    description: "A stylish black jacket.",
    image: "/images/closeup-jacket-mockup.jpg",
  },
  {
    id: "8",
    name: "Relentless Sweater Expanded",
    price: 39.99,
    description: "Relentless Sweater with expanded logo in the back.",
    image: "/images/jacket-mockup-mannequin.jpg",
  },
  {
    id: "9",
    name: "Relentless Beanie V1.0",
    price: 24.99,
    description: "Warm and cozy black beanie.",
    image: "/images/black.beanie.jpg",
  },
  {
    id: "10",
    name: "Womens Minimal Purple Logo Shirt",
    price: 19.99,
    description: "A simple minimal shirt purple logo on chest.",
    image: "/images/lady.purple.minimal.jpeg",
  },
  {
    id: "11",
    name: "Relentless Water Bottle",
    price: 19.99,
    description: "Relentless 16.oz Water Bottle.",
    image: "/images/water-bottle.png",
  },
  {
    id: "12",
    name: "Relentless Classic Mug",
    price: 19.99,
    description: "Relentless Classic Mug.",
    image: "/images/relentless-mug.jpg",
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
