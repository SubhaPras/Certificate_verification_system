import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String,
      required: true,
      unique: true
    },
    studentRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    url: {
      type: String  // path or cloud url
    },
    generatedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ["valid", "revoked"],
      default: "valid"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);
