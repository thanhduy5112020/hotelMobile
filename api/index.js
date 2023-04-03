import express from "express"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()

async function connect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/bookinghotel");
        console.log("Connect successfully !!!");
    } catch (error) {
        console.log("Connect failure !!!");
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!")
})


//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})


app.listen(3000, () => {
    connect()
    console.log(`Example app listening on port ${3000}`)
})