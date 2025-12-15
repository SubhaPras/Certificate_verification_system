import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/Db.js";
import authRoutes from "./Routes/authRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js"
import cretificateRoutes from "./Routes/certificateRoutes.js"
import verifyRoutes from "./Routes/verifyRoutes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/certificates", express.static("public/certificates"));


connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/certificates", cretificateRoutes )
app.use("/api/verify", verifyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
