import express from "express";
import barChart from "../controllers/barChart.js";

const router = express.Router();

router.get("/bar", barChart);

export default router;