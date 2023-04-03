import express from "express";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel,countByCity, countByType, getHotelRooms, countByHotel, sumRevenueByHotel, sumByType } from "../controllers/hotel.js";
import { verifyAdmin, verifyToken} from "../utils/verifyToken.js";
import { createError } from "../utils/error.js";

const router = express.Router();


//CREAT
router.post("/", verifyAdmin, createHotel)
//UPDATE
router.put("/:id",  updateHotel)
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel)
//GET
router.get("/find/:id", getHotel)
//GET ALL
router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/sumRevenueByHotel", sumRevenueByHotel)
router.get("/sumByType", sumByType)
//COUNT BY HOTEL
router.get("/countByHotel", countByHotel)
router.get("/room/:id", getHotelRooms)


export default router