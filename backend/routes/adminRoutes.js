import express from "express";
import {
  createAdminUser,
  getAdminUsers,
  updateAdminUser,
  deleteAdminUser,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/", createAdminUser);
router.get("/", getAdminUsers);
router.put("/:id", updateAdminUser);
router.delete("/:id", deleteAdminUser);

export default router;
