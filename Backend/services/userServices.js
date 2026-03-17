import * as usersDAL from '../dal/usersDAL.js';

export const createUser = async ({ username, password, email, user_type }) => {
    if (!username || !password || !email || !user_type) {
        throw new Error('username, password, email and user_type are required');
    }

    const existing = await usersDAL.getUserByEmail(email);
    if (existing) {
        throw new Error('Email already registered');
    }

    const user = await usersDAL.createUser({ username, password, email, user_type });
    return user;
}

export const updateUser = async (id, data) => {
    return await usersDAL.updateUserById(id, data);
}

export const deleteUser = async (id) => {
    return await usersDAL.deleteUserById(id);
}

export const getUserByEmail = async (email) => {
    return await usersDAL.getUserByEmail(email);
}

export const validateUserCredentials = async (identifier, password) => {
    const user = await usersDAL.getUserByEmail(identifier) || await usersDAL.getUserByUsername(identifier);
    if (!user) return null;
    if (user.password !== password) return null;
    return user;
}

export const getUserById = async (id) => {
    return await usersDAL.getUserById(id);
}

export const getAllUsers = async () => {
    return await usersDAL.getAllUsers();
}