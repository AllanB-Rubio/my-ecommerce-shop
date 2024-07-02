import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { createTables, client } from "./db.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:5173",
      "https://relentless-pursuit-e19b1.web.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

const buildPath = path.join(__dirname, "../public");
app.use(express.static(buildPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", authenticateToken, userRoutes);
app.use("/api/orders", orderRoutes); // Note: No authentication for guest checkout
app.use("/api/reviews", authenticateToken, reviewRoutes);
app.use("/api/addresses", authenticateToken, addressRoutes);
app.use("/api/payments", authenticateToken, paymentRoutes);

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send({ message: error.message });
});

const PORT = process.env.PORT || 3000;

client
  .connect()
  // .then(() => {
  //   // return createTables();
  // })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
  });
