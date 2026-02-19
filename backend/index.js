import express from 'express';
 import cors from "cors";
const app=express();
import dotenv from 'dotenv';
dotenv.config(); // read .env file and store all variable in process.env onject
import { connectDB } from './config/db.js'; // curly bracket due to named export
import userRoutes from './routes/user.route.js';
import blogRoutes from './routes/blog.route.js';
import cookieParser from 'cookie-parser';

const port=process.env.PORT || 5000;
 

connectDB();
// middleware
app.use(express.json());
 
app.use(cors({
  origin: ["http://localhost:5173","https://blog-plateform-zeta.vercel.app"],
  credentials: true
}));

app.use(cookieParser());
app.use('/api/user',userRoutes);
app.use('/api/blog',blogRoutes);

app.get('/',(req,res)=>{
    res.send('Backend is running...');
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})