import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
  createGuestOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.post("/guest", createGuestOrder);

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.get("/user/orders", getOrdersByUserId);

router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
