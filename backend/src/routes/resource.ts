import express from 'express';
import { getResources, createResource } from '../controllers/resourceController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

// Lấy danh sách resource của user
router.get('/', authenticateToken, getResources);

// Tạo mới một resource
router.post('/', authenticateToken, createResource);

export default router;
