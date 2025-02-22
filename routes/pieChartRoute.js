import express from "express";
import pieChart from "../controllers/pieChart.js";

const router = express.Router();

router.get("/pie", pieChart);

export default router;