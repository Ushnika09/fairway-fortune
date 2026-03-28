import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    scores: {
      type: [Number],
      default: [],
    },

    charityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Charity",
    },

    charityPercent: {
      type: Number,
      default: 10,
    },

    subscription: {
      status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
      },
      plan: String,
      amount: Number,
      startDate: Date,
      expiryDate: Date,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
