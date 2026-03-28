import mongoose from "mongoose";

const drawSchema = new mongoose.Schema(
  {
    numbers: {
      type: [Number],
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    totalPrizePool: {
      type: Number,
      default: 0,
    },

    totalCharity: {
      type: Number,
      default: 0,
    },

    jackpotCarry: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Draw", drawSchema);