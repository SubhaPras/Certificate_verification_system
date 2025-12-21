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


export const getCertificateDetails = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({ certificateId })
      .populate("studentRef");

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.json({
      certificateId: certificate.certificateId,
      status: certificate.status,
      generatedAt: certificate.generatedAt,
      url: certificate.url,
      student: {
        name: certificate.studentRef.name,
        email: certificate.studentRef.email,
        domain: certificate.studentRef.domain,
        startDate: certificate.studentRef.startDate,
        endDate: certificate.studentRef.endDate
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch certificate details",
      error: error.message
    });
  }
};


export const downloadCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({ certificateId });
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
      console.log("not found");
      
    }

    const filePath = path.join(
      process.cwd(),
      "public",
      "certificates",
      `${certificateId}.pdf`
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Certificate file missing" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${certificateId}.pdf"`
    );

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } catch (error) {
    res.status(500).json({
      message: "Failed to download certificate",
      error: error.message
    });
  }
};
