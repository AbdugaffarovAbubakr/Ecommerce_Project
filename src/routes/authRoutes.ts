import express from "express";
import { register, login } from "../controllers/authController"; 

const router = express.Router();

router.post("/register", register as unknown as express.RequestHandler);
router.post("/login", login as unknown as express.RequestHandler);

export default router;
