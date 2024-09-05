import express from 'express';
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors'


//local import files
import { coonectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
import genereRoutes from './routes/genereRoutes.js'

dotenv.config();
const app=express();
const PORT=process.env.PORT || 3000


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


//database connection
coonectDB();

//routes
app.use('/api/users',userRoutes);
app.use('/api/movies',movieRoutes);
app.use('/api/generes',genereRoutes);

app.listen(PORT, ()=>{console.log(`server is running on port ${PORT}`);
});


app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500
    const message=err.message || "internal server error"
    res.status(statusCode).json({
 success:false,
 statusCode,
 message
    })
})



