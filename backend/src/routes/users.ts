import express from 'express';
import { getMe, getAllUsers, updateUserRole, deleteUser } from '../controllers/userController';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler'; 

const router = express.Router();

router.get('/me', authenticateToken, asyncHandler(getMe)); 

// Admin routes
router.get('/', authenticateToken, requireAdmin, asyncHandler(getAllUsers));
router.patch('/:id/role', authenticateToken, requireAdmin, asyncHandler(updateUserRole));
router.delete('/:id', authenticateToken, requireAdmin, asyncHandler(deleteUser));

export default router;
