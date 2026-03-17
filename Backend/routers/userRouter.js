import express from 'express';
import * as userController from '../controllers/userController.js';
import { requireAuth, requireUserType } from '../middleware/authMiddleware.js';

const router = express.Router();



router.post('/register', requireAuth, requireUserType(['admin']), userController.registerUser);
router.put('/register/:id', requireAuth, requireUserType(['admin']), userController.updateUser);
router.delete('/register/:id', requireAuth, requireUserType(['admin']), userController.deleteUser);
router.get('/users', requireAuth, requireUserType(['admin']), userController.getAllUsers);
router.post('/login', userController.login);
router.get('/me', requireAuth, userController.getCurrentUser);

export default router;
