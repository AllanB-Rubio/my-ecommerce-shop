// backend/routes/guestCheckoutRoutes.js
import express from "express";
import { createGuestOrder } from "../controllers/guestCheckoutController";

const router = express.Router();

// Route for guest checkout
router.post("/guest-checkout", createGuestOrder);

export default router;
