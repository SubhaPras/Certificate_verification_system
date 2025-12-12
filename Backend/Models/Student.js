import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    domain: {
      type: String
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    certificateId: {
      type: String  // generated later
    }
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
