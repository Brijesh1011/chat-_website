
import jwt from "jsonwebtoken"


// export const generateToken=(userId,res)=>{
//     const token=jwt.sign({userId},process.env.JWT_SECRET,{
//         expiresIn:"7d"
//     })

//     res.cookie("jwt",token,{
//         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//         httpOnly: true, // can't be accessed via JS (protects against XSS)
//         sameSite: "strict", // helps against CSRF
//         secure: process.env.NODE_ENV !== "development", // only HTTPS in production
//     })

//     return token;
// }

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

 res.cookie("jwt", token, {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
  secure: process.env.NODE_ENV !== "development",
});


  return token;
};
