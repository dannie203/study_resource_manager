import express from 'express';
import { getMe } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler'; 

const router = express.Router();

router.get('/me', authenticateToken, asyncHandler(getMe)); 

export default router;
