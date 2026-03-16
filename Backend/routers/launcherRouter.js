import express from 'express';
import * as launchersController from '../controllers/launchersController.js';

const router = express.Router();

router.get('/', launchersController.getAllLaunchers);
router.get('/:id', launchersController.getAllLaunchersById);
router.post('/', launchersController.createLauncher);
router.delete('/:id', launchersController.deleteLauncherById);
router.put ('/:id', launchersController.updateLauncherById)

export default router;