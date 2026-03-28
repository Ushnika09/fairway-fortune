import User from "../models/User.js";
import Charity from "../models/Charity.js";

export const addScore = async (req, res) => {
  try {
    const userId = req.user.id;
    const { score } = req.body;

    // 1. Validation
    if (!score) {
      return res.status(400).json({
        success: false,
        message: "Score is required",
      });
    }

    if (score < 1 || score > 45) {
      return res.status(400).json({
        success: false,
        message: "Score must be between 1 and 45",
      });
    }

    // 2. Find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. FIFO logic
    if (user.scores.length >= 5) {
      user.scores.shift(); // remove oldest
    }

    user.scores.push(score);

    // 4. Save
    await user.save();

    res.status(200).json({
      success: true,
      message: "Score added successfully",
      scores: user.scores,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const subscribeUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { plan } = req.body;

    // 1. Validate input
    if (!plan) {
      return res.status(400).json({
        success: false,
        message: "Plan is required",
      });
    }

    const validPlans = ["monthly", "quarterly", "yearly"];

    if (!validPlans.includes(plan)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscription plan",
      });
    }

    // 2. Fetch user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Check if already active
    if (user.subscription?.status === "active") {
      return res.status(409).json({
        success: false,
        message: "Subscription already active",
      });
    }

    // 4. Plan config
    const planConfig = {
      monthly: { amount: 100, duration: 30 },
      quarterly: { amount: 250, duration: 90 },
      yearly: { amount: 1000, duration: 365 },
    };

    const selectedPlan = planConfig[plan];

    // 5. Dates
    const startDate = new Date();

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + selectedPlan.duration);

    // 6. Update subscription
    user.subscription = {
      status: "active",
      plan,
      amount: selectedPlan.amount,
      startDate,
      expiryDate,
    };

    await user.save();

    // 7. Response
    return res.status(200).json({
      success: true,
      message: "Subscription activated successfully",
      subscription: user.subscription,
    });

  } catch (error) {
    console.error("Subscription Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const selectCharity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { charityId, charityPercent } = req.body;

    // Validation
    if (!charityId || !charityPercent) {
      return res.status(400).json({
        success: false,
        message: "Charity and percentage are required",
      });
    }

    if (charityPercent < 10) {
      return res.status(400).json({
        success: false,
        message: "Minimum charity percentage is 10%",
      });
    }

    if (charityPercent > 100) {
      return res.status(400).json({
        success: false,
        message: "Percentage cannot exceed 100%",
      });
    }

    // Check charity exists
    const charity = await Charity.findById(charityId);

    if (!charity || !charity.isActive) {
      return res.status(404).json({
        success: false,
        message: "Charity not found",
      });
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      userId,
      {
        charityId,
        charityPercent,
      },
      { new: true }
    ).populate("charityId", "name");

    return res.status(200).json({
      success: true,
      message: "Charity selected successfully",
      charity: user.charityId,
      charityPercent: user.charityPercent,
    });

  } catch (error) {
    console.error("Select Charity Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({ user });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};