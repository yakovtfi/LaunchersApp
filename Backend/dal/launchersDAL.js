import { launchers } from "../models/launchers.js";

export const createLauncher = async (data) => {
    const launcher = new launchers (data);
    return await launcher.save();
} 

export const getAllLaunchers = async() => {
    return await launchers.find();
}

export const getAllLaunchersById = async (id) =>{
    return await launchers.findById(id)
}

export const deleteLauncherById = async (id) => {
    return await launchers.findByIdAndDelete(id)
}