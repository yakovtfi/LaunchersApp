import mongoose from "mongoose";


const launchersSchema = mongoose.Schema({
    name: {type:String,require:true},
    city: {type:String, require:true},
    rocketType: {type:String, require:true},
    latitude: {type:Number, require: true},
    longitude: {type:Number, require:true}
})

export const launchers = mongoose.model('launchers',launchersSchema, 'launchers')