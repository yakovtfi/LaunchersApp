import { users } from "../models/users.js";

export const createUser = async (data) => {
    const user = new users(data);
    return await user.save();
}

export const updateUserById = async (id, data) => {
    return await users.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
}

export const deleteUserById = async (id) => {
    return await users.findByIdAndDelete(id);
}

export const getUserByEmail = async (email) => {
    return await users.findOne({ email });
}

export const getUserById = async (id) => {
    return await users.findById(id);
}

export const getAllUsers = async () => {
    return await users.find();
}

export const updateLastLogin = async (userId) => {
    return await users.findByIdAndUpdate(
        userId,
        { last_login: new Date() },
        { new: true }
    );
};