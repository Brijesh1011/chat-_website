import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const authlogin=async (req,res,next)=>{
  try {
    
    const token =req.cookies.jwt;
    console.log("Cookies on request:", req.cookies);


    if(!token){
        return res.status(400).json({message:"Unauthorized -no token provided"})
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET)

    if(!decoded){
        return res.status(400).json({message:"Unauthorized -invalid token provided"})
    }

    const user=await User.findById(decoded.userId).select("-password")

    if(!user){
        return res.status(404).json({message:"No user found"})
    }
   req.user=user
   next()
  } catch (error) {
    console.log("Error in auth middleware",error)
        return res.status(500).json({message:"Error in auth middleware"})
  }
}
