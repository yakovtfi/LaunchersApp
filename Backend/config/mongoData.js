import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

export const connectMongoData = async () =>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log('Login successfully to data');
        
    }catch(error){
        console.log(error);
        
    }
}