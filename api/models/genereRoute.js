import mongoose from "mongoose";

const genereSchema=mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true,
        maxLength:32,
        trim:true
    },


},{timestamps:true});

const Genere=mongoose.model("Genere",genereSchema);
export default Genere;