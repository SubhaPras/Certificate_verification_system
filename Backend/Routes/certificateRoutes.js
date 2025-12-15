import express from "express";
import { downloadCertificate, generateCertificate, getCertificateDetails } from "../Controllers/certificateController.js";
import { requireAdmin } from "../Middlewares/adminMiddleware.js";
import { protect } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:certificateId", getCertificateDetails);
router.get("/download/:certificateId", downloadCertificate);
router.post("/generate-certificate/:studentId", protect, requireAdmin, generateCertificate);

export default router;
