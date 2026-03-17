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
        const payload = {
            ...req.body,
            userId: req.body.userId || req.userId
        };
        const launchers = await launchersDAL.createLauncher(payload);
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
export const updateLauncherById = async (req, res) =>{
    try{
        const {id} =req.params;
        if (req.user?.user_type === 'air_force') {
            const allowedKeys = ['destroyed'];
            const updates = Object.keys(req.body || {});
            const hasInvalid = updates.some((key) => !allowedKeys.includes(key));
            if (hasInvalid) {
                return res.status(403).json({ message: 'Forbidden: air_force can only update destroyed field' });
            }
        }

        const launchers = await launchersDAL.updateLauncherById(id, req.body)
         if(!launchers){
            return res.status(404).json({message: "Launcher not fond"})
        }
        res.status(200).json(launchers)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
