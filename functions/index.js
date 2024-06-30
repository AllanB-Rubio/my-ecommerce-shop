const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Your route imports here
const authRoutes = require("../backend/routes/authRoutes");
const productRoutes = require("../backend/routes/productRoutes");
const cartRoutes = require("../backend/routes/cartRoutes");
const adminRoutes = require("../backend/routes/adminRoutes");
const userRoutes = require("../backend/routes/userRoutes");
const orderRoutes = require("../backend/routes/orderRoutes");
const reviewRoutes = require("../backend/routes/reviewRoutes");
const addressRoutes = require("../backend/routes/addressRoutes");
const paymentRoutes = require("../backend/routes/paymentRoutes");

const app = express();
app.use(cors({ origin: true }));
app.use(morgan("dev"));
app.use(express.json());

// Use your routes here
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin/users", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/payments", paymentRoutes);

// Handle errors
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send({ message: error.message });
});

exports.api = functions.https.onRequest(app);
