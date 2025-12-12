import express from "express";
import { generateCertificate } from "../Controllers/certificateController.js";
import { requireAdmin } from "../Middlewares/adminMiddleware.js";
import { protect } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/generate-certificate/:studentId", protect, requireAdmin, generateCertificate);

export default router;
