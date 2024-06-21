// backend/routes/paymentRoutes.js
import express from "express";
import { savePaymentInfo } from "../controllers/paymentsController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, savePaymentInfo);

export default router;
