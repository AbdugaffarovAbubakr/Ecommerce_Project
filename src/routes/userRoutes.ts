import express from "express";
import { getUserProfile, updateUserProfile, deleteUser } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/profile", getUserProfile as express.RequestHandler);
router.put("/profile", updateUserProfile as express.RequestHandler);
router.delete("/profile", deleteUser as express.RequestHandler);

export default router;
