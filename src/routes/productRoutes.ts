import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { protect, admin } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getProducts as express.RequestHandler);
router.get("/:id", getProductById as express.RequestHandler);
router.post("/", createProduct as express.RequestHandler);
router.put("/:id", updateProduct as express.RequestHandler);
router.delete("/:id", deleteProduct as express.RequestHandler);

export default router;
