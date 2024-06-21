// src/routes/shippingBillingRoutes.js
import express from "express";
import {
  saveShippingAddress,
  saveBillingAddress,
} from "../controllers/shippingBillingController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/shipping", authenticateToken, saveShippingAddress);
router.post("/billing", authenticateToken, saveBillingAddress);

export default router;
