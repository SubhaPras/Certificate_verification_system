import express from "express";
import { verifyLimiter } from "../Middlewares/verifyRateLimit.js";
import { verifyCertificate } from "../Controllers/verifyController.js";


const router = express.Router();

router.get("/:certificateId", verifyLimiter, verifyCertificate);

export default router;
