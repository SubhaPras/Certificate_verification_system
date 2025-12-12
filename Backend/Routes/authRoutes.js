import express from "express";
import { register, login } from "../Controllers/authController.js"
import { protect } from "../Middlewares/authMiddleware.js";
import { requireAdmin } from "../Middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);


export default router;
