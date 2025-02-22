import express from "express";
import listAllFiles from "../controllers/listAllFiles.js";

const router = express.Router();

router.get("/list", listAllFiles);

export default router;