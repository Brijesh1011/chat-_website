import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { generateToken } from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js";

export const signup=async (req,res)=>{
    const { fullName ,email ,password }=req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
          }
        
        if (password.length<6){
            return res.status(400).json({message: " Password must be at least 6 character"})
        }

        const user=await User.findOne({email})

        if (user){
            return res.status(400).json({message: " Email is already Exits"})
        }

        const salt=await bcrypt.genSalt(10)
        const hashpassword=await bcrypt.hash(password,salt)

        const newUser=new User({
           fullName,
           email,
           password:hashpassword
        })

        if(newUser){
          //generate jwt token
          generateToken(newUser._id,res)
          await newUser.save()

          return res.status(201).json({
            message:"user created successfully",
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            })
          
        }else{
           return res.status(400).json({message:"Invalid user data"})  
        }


    } catch (error) {
        console.log("Error in sign Up controller",error)
        return res.status(500).json({message:"website crashed"})
    }
}
export const login=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"Invalid Email Or Password"})
          }

        const isPasswordCorect= await bcrypt.compare(password,user.password)

        if(!isPasswordCorect){
            return res.status(400).json({message:"Invalid Email Or Password"}) 
        }

        generateToken(user._id,res)
       
        return res.status(201).json({
            message:"user LogIn successfully",
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            })
        
    } catch (error) {
        console.log("Error in Log In controller",error)
        return res.status(500).json({message:"website crashed"})
    }
}
export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged Out successfully"})

    } catch (error) {
        console.log("Error in Log In controller",error)
        return res.status(500).json({message:"website crashed"})
    }
}

// export const updateProfile=async(req,res)=>{
//     try {
//         const userId=req.user._id
//         const {fullName,profilePic}=req.body
        
//         if (!profilePic){
//             return res.status(400).json({message:"profile is required"})
//         }  
//         const uploadResponse=await cloudinary.uploader.upload(profilePic)

//         // Prepare update object
//         const updateData = {
//             profilePic: uploadResponse.secure_url
//         };

//         if (fullName) {
//             updateData.fullName = fullName;
//         }

//         // Update user
//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             updateData,
//             { new: true }
//         );

//         if (!updatedUser) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         return res.status(200).json({
//             message: "Profile updated successfully",
//             user: updatedUser
//         });

//     } catch (error) {
//         console.log("Error in update controller",error)
//         return res.status(500).json({message:"website crashed"}) 
//     }
// }


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, profilePic } = req.body;

    if (!profilePic && !fullName) {
      return res.status(400).json({ message: "At least one field (fullName or profilePic) is required." });
    }

    const updateData = {};

    if (profilePic) {
      if (!profilePic.startsWith("data:image")) {
        return res.status(400).json({ message: "Invalid image format" });
      }

      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      updateData.profilePic = uploadResponse.secure_url;
    }

    if (fullName) {
      updateData.fullName = fullName;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateProfile controller:", error);
    return res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};


export const checkAuth=(req,res)=>{
try {
    return res.status(200).json(req.user);

} catch (error) {
    console.log("Error in check auth controller",error)
    return res.status(500).json({message:"website crashed"})
}
}