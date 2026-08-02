import express from 'express';
import { createUser, getAllUsers, getUserById, updateUserById, updateUserItemById, deleteUser, getMe } from '../controllers/test.controller.js';
import { upload } from '../middleware/multer.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', upload.single('image'), createUser)
router.put('/:id', upload.single('image'), updateUserById)
router.patch('/:id', upload.single('image'), updateUserItemById)
router.delete('/:id', requireAuth, deleteUser)

router.get('/me', requireAuth, getMe)

export default router