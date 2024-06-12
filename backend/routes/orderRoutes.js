import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
} from "../controllers/orderController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, createOrder);
router.get("/", authenticateToken, getOrders);
router.get("/:id", authenticateToken, getOrderById);
router.get("/user/orders", authenticateToken, getOrdersByUserId);
router.put("/:id", authenticateToken, updateOrder);
router.delete("/:id", authenticateToken, deleteOrder);

export default router;
