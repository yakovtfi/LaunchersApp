import mongoose from "mongoose";


const launchersSchema = mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    rocketType: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
}, { timestamps: true })

export const launchers = mongoose.model('launchers',launchersSchema, 'launchers')