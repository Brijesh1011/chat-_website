import mongoose from "mongoose"

const  connectDB=async()=>{
    try{
      const CI=await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
      console.log(`Mongo DB is connected DB_HOST:${CI.connection.host}`)
    }catch(error){
        console.log("connection error",error)
        process.exit(1);
    }
}

export {connectDB}