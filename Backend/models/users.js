import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true
    },
    user_type: {
        type:String,
        enum:["intel", "air_force", "admin", "user"],
        require:true
    },
    last_login:{type:Date}
})

export const users =  mongoose.model("users", usersSchema, "users")