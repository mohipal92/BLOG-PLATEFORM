import mongoose from "mongoose";
const port=process.env.PORT || 5000;

 export const connectDB=async()=>{
       try {
        await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log(`MongoDB connected successfully `);
        })             
       } catch (error) {
        console.log("MongoDB connection error:", error);
       }
}
 