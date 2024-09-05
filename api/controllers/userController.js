import { asyncHandler } from "../middleWare/asyncHandler.js";
import User from "../models/userModel.js";
import { generateToken } from "../utils/createToken.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcryptjs';


export const register=asyncHandler(async(req,res,next)=>{
    const {userName,email,password}=req.body;
if(!userName || !email || !password) return next(errorHandler(400,"all fields are required"));
  

  try {
    const existedUser= await User.findOne({email});
    if(existedUser) return next(errorHandler(400,"user already exists"));

    const hashedPssword=bcrypt.hashSync(password,10);
    const newUser=new User({userName,email,password:hashedPssword});
    await newUser.save();

    generateToken(res,newUser._id)
  
    const {password:pass, ...rest}=newUser._doc
    res.status(201).json(rest);
    
  } catch (error) {
    next(error)
  };


});
//login

export const login=asyncHandler(async(req,res,next)=>{

  const {email,password}=req.body;
  if(!email || !password) return next(errorHandler(400,"all fields are required"));
    
  
    try {
      const existedUser= await User.findOne({email});
      if(!existedUser) return next(errorHandler(400,"user not found"));
  
      const validPssword=bcrypt.compareSync(password,existedUser.password);
      if(!validPssword) return next(errorHandler(400,"incorrect credentials"));
      if(validPssword){
        generateToken(res,existedUser._id)
    
        const {password:pass, ...rest}=existedUser._doc
        res.status(200).json(rest);
      }
    
    } catch (error) {
      next(error)
    };



});

export const logout=asyncHandler(async(req,res,next)=>{
  try {

  res.cookie("JWT", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  // res.clearCookie("JWT");

  res.status(200).json({ message: "Logged out successfully" });
    
  } catch (error) {
    next(error);
  }

});

export const getAllUsers=asyncHandler(async(req,res,next)=>{

  try {

  const users= await User.find({});

  res.status(200).json(users)
    
  } catch (error) {
    next(error);
    
  }

});

//getUserById
export const getCurrentUser=asyncHandler(async(req,res,next)=>{
  try {
    const currentUser=await User.findById(req.user._id);
    if(!currentUser) return next(errorHandler(404,"User Not Found"))
    const {password:pass, ...rest}=currentUser._doc
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }



});
export const updateUser=asyncHandler(async(req,res,next)=>{
  try {
    const {userName,email,password}=req.body;
    let hashedPassword;
    if(password){
      hashedPassword=bcrypt.hashSync(password,10);

    }

     const updatedUser=await User.findByIdAndUpdate(req.user._id,
      {$set:
        {
          userName:userName,
          email:email,
          password:hashedPassword
        }
      }
          ,{new:true}) ;

    const {password:pass, ...rest}=updatedUser._doc
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }


});

export const deleteUser=asyncHandler(async(req,res,next)=>{

  try {
    const deleteUser=await User.findByIdAndDelete(req.user._id);
    res.cookie('JWT', "", {
      httpOnly:true,
      expires:new Date(0)
    })
    res.json("user deleted succesfully");
  } catch (error) {
    next(error);
  }

});