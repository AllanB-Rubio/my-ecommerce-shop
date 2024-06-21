// backend/routes/addressRoutes.js
import express from "express";
import { saveAddresses } from "../controllers/addressController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, saveAddresses);

export default router;
