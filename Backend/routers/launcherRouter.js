import express from 'express';
import * as launchersController from '../controllers/launchersController.js';
import { requireAuth, requireUserType } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', requireAuth, launchersController.getAllLaunchers);
router.get('/:id', requireAuth, launchersController.getAllLaunchersById);
router.post('/', requireAuth, requireUserType(['admin', 'intel']), launchersController.createLauncher);
router.delete('/:id', requireAuth, requireUserType(['admin', 'intel']), launchersController.deleteLauncherById);
router.put('/:id', requireAuth, requireUserType(['admin', 'intel', 'air_force']), launchersController.updateLauncherById);

export default router;