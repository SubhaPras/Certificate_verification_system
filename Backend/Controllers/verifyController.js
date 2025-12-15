import Certificate from "../Models/Certificate.js";

export const verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    // Basic validation
    if (!certificateId || !certificateId.startsWith("CERT-")) {
      return res.status(400).json({
        message: "Invalid certificate ID format"
      });
    }

    const certificate = await Certificate.findOne({ certificateId })
      .populate("studentRef");

    if (!certificate) {
      return res.status(404).json({
        valid: false,
        message: "Certificate not found"
      });
    }

    if (certificate.status !== "valid") {
      return res.json({
        valid: false,
        status: certificate.status,
        message: "Certificate is not valid"
      });
    }

    res.json({
      valid: true,
      certificateId: certificate.certificateId,
      status: certificate.status,
      generatedAt: certificate.generatedAt,
      student: {
        name: certificate.studentRef.name,
        domain: certificate.studentRef.domain,
        startDate: certificate.studentRef.startDate,
        endDate: certificate.studentRef.endDate
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Verification failed",
      error: error.message
    });
  }
};
