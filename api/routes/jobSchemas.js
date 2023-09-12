import express from "express";
import { createJob, getAllJobs } from "../controllers/jobSchema.js";
const router = express.Router();

router.get("/",  getAllJobs)
router.post("/",  createJob)

export default router