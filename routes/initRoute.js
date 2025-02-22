import express from "express";
import initialize from "../controllers/initialize.js";

const router = express.Router();

router.get("/init", initialize);

export default router;