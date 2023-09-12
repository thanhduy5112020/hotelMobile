import express from "express";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel,countByCity, countByType, getHotelRooms, countByHotel, sumRevenueByHotel, sumByType, searchHotelByLocation, searchHotelsByPriceRange, getTopRatedHotels, calculateTotal, calculateAverageRating, findHotelWithMaxRevenue, findTopHotelsByTotal, calculateTotalByType, searchHotelByType } from "../controllers/hotel.js";
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
router.get("/searchHotelByLocation", searchHotelByLocation)
router.get("/searchHotelsByPriceRange", searchHotelsByPriceRange)
router.get("/getTopRatedHotels", getTopRatedHotels)
router.get("/calculateTotal", calculateTotal)
router.get("/calculateAverageRating", calculateAverageRating)
router.get("/findHotelWithMaxRevenue", findHotelWithMaxRevenue)
router.get("/findTopHotelsByTotal", findTopHotelsByTotal)
router.get("/calculateTotalByType", calculateTotalByType)
router.get("/searchHotelByType", searchHotelByType)


export default router