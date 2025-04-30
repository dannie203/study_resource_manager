import express from 'express';
import { getResources, createResource } from '../controllers/resourceController';
import { authenticateToken } from '../middleware/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

// Lấy danh sách resource
router.get('/', asyncHandler(authenticateToken), asyncHandler(getResources));

// Tạo resource mới
router.post('/', asyncHandler(authenticateToken), asyncHandler(createResource));

export default router;
