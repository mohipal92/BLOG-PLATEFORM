import jwt from "jsonwebtoken";

export const verifyAdmin =(req,res,next)=>{
    const token =req.cookies.token 
    if(!token){
    return res.status(401).json({message:"Unauthorized: No token provided"});
    }
   
    const decoded =jwt.verify(token,process.env.JWT_SECRET);
      req.user=decoded; // Attach decoded user info to request object {id,role that was payload}
      if(req.user.role !=="admin"){
        console.log("you are not permitted for this role");
        return res.status(403).json({message:"Forbidden: You do not have access to this resource"});
        
      }
      next();
}
export const verifyUser =(req,res,next)=>{
    const token =req.cookies.token 
    if(!token){
    return res.status(401).json({message:"Unauthorized: No token provided"});
    }
   
    const decoded =jwt.verify(token,process.env.JWT_SECRET);
      req.user=decoded; // Attach decoded user info to request object
      next();
}
