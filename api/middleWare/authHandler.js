import User from "../models/userModel.js";
import { asyncHandler } from "./asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';


export const authenticate=asyncHandler(async (req,res,next) => {

    const token=req.cookies.JWT;
    if(!token){
        res.status(404).json("no authorize no token");
    }
    else{
        try {  
             const decoded=jwt.verify(token,process.env.JWT_SECRET);
             req.user=await User.findById(decoded.userId).select("-password")

             next()
            
        } catch (error) {
            next(error)
        }
     
    }
    
    
})

export const authorizeAdmin=(req,res,next)=>{
    try {
        if (req.user && req.user.isAdmin){
            next();
        }
        else{
            res.status(401).json("Not Authorized as an Admin");
        }
    } catch (error) {
        next(error);
    }
}
