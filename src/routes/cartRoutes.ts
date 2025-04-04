import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../controllers/cartController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getCart as express.RequestHandler);
router.post("/", addToCart as express.RequestHandler);
router.delete("/:productId", removeFromCart as express.RequestHandler);
router.delete("/", clearCart as express.RequestHandler);

export default router;
