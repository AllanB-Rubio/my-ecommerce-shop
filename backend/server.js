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
import addressRoutes from "./routes/addressRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { createTables, client } from "./db.js";
import { authenticateToken } from "./middleware/authMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/dist/index.html"))
);

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin/users", authenticateToken, adminRoutes);
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
