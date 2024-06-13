import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  createAdminUser,
  getAdminUsers,
  updateAdminUser,
  deleteAdminUser,
  getAdminUserByUsername,
} from "../controllers/adminController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

dotenv.config();
const router = express.Router();

router.post("/", authenticateToken, createAdminUser); // Protect the create admin user route
router.get("/", authenticateToken, getAdminUsers);
router.put("/:id", authenticateToken, updateAdminUser);
router.delete("/:id", authenticateToken, deleteAdminUser);

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await getAdminUserByUsername(username);
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
