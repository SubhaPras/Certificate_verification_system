import multer from "multer";

const storage = multer.memoryStorage();

const uploadExcelMiddleware = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowed =
      file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype === "application/vnd.ms-excel";

    if (!allowed) {
      cb(new Error("Only Excel (.xlsx/.xls) files are allowed"));
    } else {
      cb(null, true);
    }
  },
}).single("file"); // IMPORTANT: field name must be "file"

export default uploadExcelMiddleware;
