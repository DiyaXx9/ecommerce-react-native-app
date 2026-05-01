import express from "express";
import {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} from "../controllers/cartController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);

// ✅ NEW ROUTES
router.put("/", protect, updateCart);
router.delete("/:id", protect, removeFromCart);

export default router;