// backend/server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { createTables, client } from "./db.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Ensure this matches your frontend URL
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin/users", authenticateToken, adminRoutes);
app.use("/api/users", authenticateToken, userRoutes);
app.use("/api/orders", authenticateToken, orderRoutes);
app.use("/api/reviews", authenticateToken, reviewRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send({ message: error.message });
});

const PORT = process.env.PORT || 3000;

client
  .connect()
  .then(() => {
    return createTables();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
  });
