import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

export const connectMongoData = async () =>{
    if(!MONGO_URL){
        console.error('MONGO_URL is not set. Please add MONGO_URL to your .env or environment variables.');
        return false;
    }

    try{
        await mongoose.connect(MONGO_URL);
        console.log('Connected to MongoDB');
        return true;
    }catch(error){
        console.error('Failed to connect to MongoDB:', error.message || error);
        return false;
    }
}