import express from "express"
import { authlogin } from "../middleware/auth.middleware.js"
import { getUserForSidebar,getMessages,sendMessage } from "../controllers/message.controller.js"

const messageroute=express.Router()

messageroute.get("/user",authlogin,getUserForSidebar)
messageroute.get("/:id",authlogin,getMessages)

messageroute.post("/send/:id",authlogin,sendMessage)


export default messageroute

