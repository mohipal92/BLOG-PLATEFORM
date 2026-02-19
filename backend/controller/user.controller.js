import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (req,res)=>{
        const {fullname,email,password,role,profile_pic} = req.body;
        if(!fullname || !email || !password ){
            return res.status(400).json({message:
             "fullname, email and password are required fields"
            })
        }
        try {
            const user= await User.findOne({email});
            if(user){
                return res.status(400).json({message:"uses already exist with this email"});
            }
            const hashedPassword =await bcrypt.hash(password,10);
            const newUser =new User({
                fullname,email,
                password:hashedPassword,
                role,
                photo: req.file?.path || ""
            })
            await newUser.save();
            console.log(newUser);
            return res.status(201).json({message:"User registered successfully",user:newUser});
            
        } catch (error) {
             console.log("Error during signup:", error);
             return res.status(500).json({message:"Internal server error"});
        }

}
export const login =async (req,res)=>{
       const {email,password}=req.body;
       try {
          if(!email || !password){
         return res.status(400).json({
            message:"email and password are required"
         })
       }
       const user=await User.findOne({email}).select("+password"); // explicitly select password field
       if(!user){
        return res.status(400).json({message:"Invalid email or password"});
       }
     const ismatch= await bcrypt.compare(password,user.password);
     if(!ismatch){
        return res.status(400).json({message:"Invalid email or password"});
     }
     const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
      res.cookie("token", token, {
  httpOnly: true,
  secure: true,       // true in production
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
});
 return res.status(200).json({message:"Login successful"});
    
       }
       catch (error) {
          console.log("Error during login:", error);
          return res.status(500).json({message:"Internal server error"});
       }
}
export const logout = async (req,res)=>{
    res.clearCookie("token");
    return res.status(200).json({message:"Logout successful"});
}
 
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ correct

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateProfile = async (req,res)=>{
         const userId= req.user.id;
         const {fullname}= req.body;
         const photo = req.file?.path || "";
         try {
            const user = await User.findByIdAndUpdate(userId,{fullname,photo},{new:true});
            if(!user){
                return res.status(404).json({message:"User not found"});
            }
            return res.status(200).json({user});
        } catch (error) {
            console.log("Error updating profile:", error);
            return res.status(500).json({message:"Internal server error"});
        }
}
