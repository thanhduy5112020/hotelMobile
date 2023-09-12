import express from "express";
import { createCleaner, deleteCleaner, findCleanerWithLowestTotalWork, getAllCleaners, getCleanerByHotelName, updateCleanerTotalWork } from "../controllers/cleaner.js";

const router = express.Router();

router.get("/",  getAllCleaners)
router.post("/", createCleaner)
router.put("/:id", updateCleanerTotalWork)
router.delete("/:id", deleteCleaner)
router.get("/findCleanerWithLowestTotalWork", findCleanerWithLowestTotalWork)
router.get("/getCleanerByHotelName", getCleanerByHotelName)

export default router