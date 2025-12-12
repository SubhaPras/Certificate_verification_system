import Student from "../Models/Student.js";
import Certificate from "../Models/Certificate.js";
import { generateCertId } from "../Utils/generateCertId.js";
import { certificateHTML } from "../Utils/certificateTemplate.js";
import { generatePDF } from "../Utils/generatePDF.js";
import fs from "fs";
import path from "path";

export const generateCertificate = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Generate unique certificate ID
    const certificateId = generateCertId();

    // Create HTML content
    const html = certificateHTML(student, certificateId);

    // Create PDF buffer
    const pdfBuffer = await generatePDF(html);

    // Save PDF locally (public/certificates)
    const filename = `${certificateId}.pdf`;
    const folderPath = path.join("public", "certificates");

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const filePath = path.join(folderPath, filename);
    fs.writeFileSync(filePath, pdfBuffer);

    const url = `/certificates/${filename}`;

    // Create Certificate document
    await Certificate.create({
      certificateId,
      studentRef: student._id,
      url,
      generatedAt: new Date(),
      status: "valid",
    });

    student.certificateId = certificateId;
    await student.save();

    res.status(201).json({
      message: "Certificate generated successfully",
      certificateId,
      url
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to generate certificate",
      error: error.message,
    });
  }
};
