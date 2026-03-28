import express from "express";
import { getCharities } from "../controllers/adminController.js";

const router = express.Router();

router.get("/", getCharities);

export default router;