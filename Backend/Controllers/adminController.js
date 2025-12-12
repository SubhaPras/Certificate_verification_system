import Student from "../Models/Student.js";
import Certificate from "../Models/Certificate.js";

export const getStats = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const totalCertificates = await Certificate.countDocuments();

        res.json({
            success: true,
            totalStudents,
            totalCertificates
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

export const getStudents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const students = await Student.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Student.countDocuments();

        res.json({
            success: true,
            students,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

export const getStudentById = async (req, res) => {
    try {
        const id = req.params.id;

        const student = await Student.findById(id);

        if (!student) return res.status(404).json({ success: false, message: "Student not found" });

        res.json({ success: true, student });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};
