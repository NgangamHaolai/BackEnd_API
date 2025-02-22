import express from "express";
import statistics from "../controllers/statistics.js";

const router = express.Router();

router.get("/stat", statistics);

export default router;