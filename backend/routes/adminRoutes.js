import express from "express";
import { addCharity, runDraw , getResults, approveResult } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { publishDraw } from "../controllers/adminController.js";

const router = express.Router();

router.post("/charity", protect, adminOnly, addCharity);
router.post("/draw/run", protect, adminOnly, runDraw);
router.post("/draw/publish", protect, adminOnly, publishDraw);

router.get("/results", protect, adminOnly, getResults);
router.post("/result/approve", protect, adminOnly, approveResult);

export default router;