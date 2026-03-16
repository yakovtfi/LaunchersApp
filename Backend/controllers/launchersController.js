import * as launchersDAL from '../dal/launchersDAL.js';

export const getAllLaunchers = async (req,res) => {
    try{
        const launchers = await launchersDAL.getAllLaunchers();
        res.status(200).json(launchers)
    }catch(error){
        res.status(500).json({message: error.message})
    }

}

export const getAllLaunchersById = async (req,res) => {
    try{
        const launchers = await launchersDAL.getAllLaunchersById(req.params.id);
        if(!launchers){
            return res.status(404).json({message: 'Launcher not fond'})
        }
        res.status(200).json(launchers)
    }catch(error){
        res.status(500).json({message: error.message})
    }

}

export const createLauncher = async (req,res) => {
    try{
        const launchers = await launchersDAL.createLauncher(req.body);
        res.status(201).json(launchers) 
    }catch(error){
        res.status(500).json({message: error.message})
    }

}

export const deleteLauncherById = async (req,res) => {
    try{
        const launchers = await launchersDAL.deleteLauncherById(req.params.id);
        if(!launchers){
            return res.status(404).json({message: "Launcher not fond"})
        }
        res.status(200).json(launchers)
    }catch(error){
        res.status(500).json({message: error.message})
    }

}