import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController";
import { protect, admin } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", createOrder as express.RequestHandler);
router.get("/", getOrders as express.RequestHandler);
router.get("/:id", getOrderById as express.RequestHandler);
router.put("/:id", admin, updateOrderStatus as express.RequestHandler);

export default router;
