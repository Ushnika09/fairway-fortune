import express from "express";
import { addScore, getProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { subscribeUser } from "../controllers/userController.js";
import { selectCharity } from "../controllers/userController.js";


const router = express.Router();

router.post("/add-score", protect, addScore);
router.post("/subscribe", protect, subscribeUser);
router.post("/select-charity", protect, selectCharity);
router.get("/profile", protect, getProfile);

export default router;