import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

import { connectDB } from "./lib/db.js"

import router from "./routes/auth.route.js"
import messageroute from "./routes/messageRoutes.route.js"
import { app,server } from "./lib/socket.js"


dotenv.config()

const port = process.env.PORT || 5001

// Increase JSON and URL-encoded body size limits
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONT_END_URI,
  credentials: true
}));

app.use("/api/auth", router)
app.use("/api/messages", messageroute)
app.get("/", (req, res) => {
    res.send("Test route working!");
});


server.listen(port, () => {
    console.log(`Server is running on ${port} ...`)
    connectDB()
})
