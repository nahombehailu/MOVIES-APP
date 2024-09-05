import mongoose from 'mongoose'
export const coonectDB=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI) 
        .then(()=>{
            console.log(`mongodb is connected`)   
        });
    } catch (error) {
        console.log(error.message)
        
    }
}