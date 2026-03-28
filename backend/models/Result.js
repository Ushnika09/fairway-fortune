import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    drawId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Draw",
    },
    matches: Number,
    prize: Number,
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Result", resultSchema);