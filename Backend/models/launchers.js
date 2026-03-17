import mongoose from "mongoose";

const launchersSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    name: { 
        type: String, 
        required: true 
    },
    city: { 
        type: String, 
        required: true 
    },
    rocketType: { 
        type: String, 
        required: true 
    },
    latitude: { 
        type: Number, 
        required: true 
    },
    longitude: { 
        type: Number, 
        required: true 
    }
    ,
    destroyed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const launchers = mongoose.model('launchers', launchersSchema, 'launchers');