// backend/routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
  createGuestOrder,
  getGuestOrderById,
} from "../controllers/orderController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, createOrder);
router.post("/guest", createGuestOrder);

router.get("/", authenticateToken, getOrders);
router.get("/:id", authenticateToken, getOrderById);
router.get("/guest/:id", getGuestOrderById);
router.get("/user/orders", authenticateToken, getOrdersByUserId);

router.put("/:id", authenticateToken, updateOrder);
router.delete("/:id", authenticateToken, deleteOrder);

export default router;
