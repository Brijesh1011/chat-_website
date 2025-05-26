import express from "express";

import { signup,login,logout,updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { authlogin } from "../middleware/auth.middleware.js";


const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.get("/logout",logout)
router.put("/update-profile",authlogin,updateProfile)
router.get("/check",authlogin,checkAuth)

export default router