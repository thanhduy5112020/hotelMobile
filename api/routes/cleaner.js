import express from "express";
import { createCleaner, getAllCleaners, updateCleanerTotalWork } from "../controllers/cleaner.js";

const router = express.Router();

router.get("/",  getAllCleaners)
router.post("/", createCleaner)
router.put("/:id", updateCleanerTotalWork)

export default router