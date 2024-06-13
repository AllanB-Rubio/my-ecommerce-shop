// src/App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import BestSellers from "./pages/BestSellers";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import ShoppingCart from "./pages/ShoppingCart";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";

import Footer from "./components/Footer";

import "./index.css";

function App() {
  return (
    <>
      <NavBar />
      <main className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="/best-sellers" element={<BestSellers />} />

          <Route path="account" element={<Account />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          <Route path="products" element={<ProductList />} />
          <Route path="products/:id" element={<ProductDetails />} />

          <Route path="contact" element={<Contact />} />
          <Route path="thank-you" element={<ThankYou />} />

          <Route path="cart" element={<ShoppingCart />} />
          <Route path="checkout/:orderNumber" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
