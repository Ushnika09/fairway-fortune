import Charity from "../models/Charity.js";
import Draw from "../models/Draw.js";
import User from "../models/User.js";
import Result from "../models/Result.js";

export const addCharity = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Charity name is required",
      });
    }

    // Check duplicate
    const existing = await Charity.findOne({ name });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Charity already exists",
      });
    }

    const charity = await Charity.create({
      name,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Charity added successfully",
      charity,
    });

  } catch (error) {
    console.error("Add Charity Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCharities = async (req, res) => {
  try {
    const charities = await Charity.find({ isActive: true });

    return res.status(200).json({
      success: true,
      count: charities.length,
      charities,
    });

  } catch (error) {
    console.error("Fetch Charity Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const runDraw = async (req, res) => {
  try {
    // Generate 5 unique numbers
    const numbers = new Set();

    while (numbers.size < 5) {
      const num = Math.floor(Math.random() * 45) + 1;
      numbers.add(num);
    }

    const finalNumbers = Array.from(numbers);

    const draw = await Draw.create({
      numbers: finalNumbers,
      status: "draft",
    });

    return res.status(201).json({
      success: true,
      message: "Draw created successfully",
      draw,
    });

  } catch (error) {
    console.error("Run Draw Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const publishDraw = async (req, res) => {
  try {
    const { drawId } = req.body;

    if (!drawId) {
      return res.status(400).json({
        success: false,
        message: "Draw ID is required",
      });
    }

    const draw = await Draw.findById(drawId);

    if (!draw) {
      return res.status(404).json({
        success: false,
        message: "Draw not found",
      });
    }

    if (draw.status === "published") {
      return res.status(409).json({
        success: false,
        message: "Draw already published",
      });
    }

    // 1️⃣ Get eligible users
    const users = await User.find({
      "subscription.status": "active",
      scores: { $size: 5 },
    });

    if (!users.length) {
      return res.status(400).json({
        success: false,
        message: "No eligible users",
      });
    }

    let totalPrizePool = 0;
    let totalCharity = 0;

    const winners = {
      5: [],
      4: [],
      3: [],
    };

    // 2️⃣ Loop users
    for (let user of users) {
      const amount = user.subscription.amount;
      const percent = user.charityPercent;

      const charityAmount = (amount * percent) / 100;
      const prizeContribution = amount - charityAmount;

      totalCharity += charityAmount;
      totalPrizePool += prizeContribution;

      // 3️⃣ Match logic
      const matches = user.scores.filter((num) =>
        draw.numbers.includes(num)
      ).length;

      if (matches >= 3) {
        winners[matches].push({
          userId: user._id,
          matches,
        });
      }
    }

    // 4️⃣ Prize distribution
    const distribution = {
      5: 0.4,
      4: 0.35,
      3: 0.25,
    };

    let results = [];

    for (let key of [5, 4, 3]) {
      const category = winners[key];

      if (category.length > 0) {
        const totalCategoryPrize = totalPrizePool * distribution[key];
        const perUserPrize = totalCategoryPrize / category.length;

        for (let winner of category) {
          results.push({
            userId: winner.userId,
            drawId: draw._id,
            matches: key,
            prize: perUserPrize,
          });
        }
      } else if (key === 5) {
        // jackpot carry forward
        draw.jackpotCarry += totalPrizePool * distribution[5];
      }
    }

    // 5️⃣ Save results
    await Result.insertMany(results);

    // 6️⃣ Update draw
    draw.status = "published";
    draw.totalPrizePool = totalPrizePool;
    draw.totalCharity = totalCharity;

    await draw.save();

    return res.status(200).json({
      success: true,
      message: "Draw published successfully",
      totalUsers: users.length,
      totalPrizePool,
      totalCharity,
      winners: results.length,
    });

  } catch (error) {
    console.error("Publish Draw Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const getResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate("userId", "name email")
      .populate("drawId", "numbers createdAt");

    return res.status(200).json({
      success: true,
      count: results.length,
      results,
    });

  } catch (error) {
    console.error("Fetch Results Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const approveResult = async (req, res) => {
  try {
    const { resultId } = req.body;

    if (!resultId) {
      return res.status(400).json({
        success: false,
        message: "Result ID is required",
      });
    }

    const result = await Result.findById(resultId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    if (result.status === "approved") {
      return res.status(409).json({
        success: false,
        message: "Result already approved",
      });
    }

    result.status = "approved";
    await result.save();

    return res.status(200).json({
      success: true,
      message: "Result approved successfully",
      result,
    });

  } catch (error) {
    console.error("Approve Result Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};