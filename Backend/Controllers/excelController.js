import XLSX from "xlsx";
import Student from "../Models/Student.js";
import { v4 as uuid } from "uuid";

export const uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const requiredColumns = ["studentId", "name", "email", "domain", "startDate", "endDate"];

    // Validate column names
    const firstRowKeys = Object.keys(sheetData[0] || {});
    const missing = requiredColumns.filter(col => !firstRowKeys.includes(col));

    if (missing.length > 0) {
      return res.status(400).json({
        message: `Missing columns: ${missing.join(", ")}`
      });
    }

    let studentsToInsert = [];

    for (let row of sheetData) {
      if (!row.studentId || !row.name || !row.email) continue;
    
      // Skip duplicates
      const exists = await Student.findOne({ studentId: row.studentId });
      if (exists) continue;
    
      studentsToInsert.push({
        studentId: row.studentId,
        name: row.name,
        email: row.email,
        domain: row.domain,
        startDate: row.startDate,
        endDate: row.endDate,
        certificateId: "CERT-" + uuid().slice(0, 8),
      });
    }
    

    if (studentsToInsert.length === 0) {
      return res.status(400).json({ message: "No valid rows found in Excel" });
    }

    // Insert many
    const created = await Student.insertMany(studentsToInsert);

    res.status(201).json({
      message: "Excel processed successfully",
      inserted: created.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to process Excel", error: err.message });
  }
};
