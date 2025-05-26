import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Messages from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUserForSidebar=async(req,res)=>{
   try {
    const loggedInUserId=req.user._id;
    const filteredUser=await User.find({_id: {$ne:loggedInUserId}}).select("-password")

    return res.status(200).json(filteredUser)
   } catch (error) {
    console.log("Error in getUserForSidebar func",error.message)
    return res.status(500).json({error:"server error in message control"})
   }
}

// controllers/user.controller.js



// controllers/user.controller.js





// export const getMessages=async(req,res)=>{
//     try {
//        const {id:userToChatId}=req.params

//        const senderId= req.user._id

//        const message=await Messages.find({
//         $or:[
//             {senderId:senderId,receiverId:userToChatId},
//             {senderId:userToChatId,receiverId:senderId}

//         ]
//        })

//        return res.status(200).json(message)

//     } catch (error) {
//      console.log("Error in message cntl func",error.message)
//      return res.status(500).json({error:"server error in message control"})
//     }
//  }

 export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const message = await Messages.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(message);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


 export const sendMessage=async(req,res)=>{
    try {
        
        const {text,image}=req.body;
        const { id:receiverId }=req.params
        const senderId=req.user._id

        let imageUrl;

        if(image){
         const uploadResponse=await cloudinary.uploader.upload(image);
         imageUrl=uploadResponse.secure_url;
        }
        const newMessage=new Messages({
         senderId,
         receiverId,
         text,
         image:imageUrl,
        });

        await newMessage.save();

      
      const receiverSocketId=getReceiverSocketId(receiverId);
      if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage)
      }
      

      return res.status(201).json(newMessage)

    } catch (error) {
      console.log("Error in message cntl func 123",error.message)
      return res.status(500).json({error:"server error in message control"})
    }
 }
