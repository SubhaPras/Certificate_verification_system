import express from "express";
import { protect } from "../Middlewares/authMiddleware.js";
import { requireAdmin } from "../Middlewares/adminMiddleware.js";
import { getStats, getStudents, getStudentById } from "../Controllers/adminController.js";
import uploadExcelMiddleware from "../Middlewares/uploadExcel.js";
import { uploadExcel } from "../Controllers/excelController.js";


const router = express.Router();

router.use(protect, requireAdmin);

router.get("/stats", getStats);

router.get("/students", getStudents);

router.get("/students/:id", getStudentById);

router.post("/upload-excel", protect, requireAdmin, uploadExcelMiddleware, uploadExcel);

export default router;
