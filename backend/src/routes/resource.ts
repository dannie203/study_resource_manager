import express from 'express';
import {
  getResources,
  createResource,
  downloadFile,
} from '../controllers/resourceController';
import { authenticateToken } from '../middleware/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

// Lấy danh sách resource
router.get('/', asyncHandler(authenticateToken), asyncHandler(getResources));

// Tạo resource mới
router.post('/', asyncHandler(authenticateToken), asyncHandler(createResource));

// Tải file với tên gốc (giải mã đúng)
router.get('/download/:filename', asyncHandler(downloadFile)); 

export default router;
