import express from 'express';
import {
  getResources,
  createResource,
  downloadFile,
  getResourceStats,
  getResourceCategoryStats,
  getResourceDownloadChart,
  getTopDownloadedResources,
  adminGetAllResources,
  adminDeleteResource,
  adminApproveResource,
  deleteResource,
} from '../controllers/resourceController';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

// Lấy danh sách resource
router.get('/', asyncHandler(authenticateToken), asyncHandler(getResources));

// Tạo resource mới
router.post('/', asyncHandler(authenticateToken), asyncHandler(createResource));

// Tải file với tên gốc (giải mã đúng)
router.get('/download/:filename', asyncHandler(downloadFile)); 

// Lấy thống kê tổng quan (tổng số, upload, download)
router.get('/stats', asyncHandler(authenticateToken), asyncHandler(getResourceStats));

// Thống kê phân loại tài nguyên
router.get('/category-stats', asyncHandler(authenticateToken), asyncHandler(getResourceCategoryStats));

// Biểu đồ lượt tải xuống theo thời gian
router.get('/download-chart', asyncHandler(authenticateToken), asyncHandler(getResourceDownloadChart));

// Top tài nguyên được tải nhiều nhất
router.get('/top-downloads', asyncHandler(authenticateToken), asyncHandler(getTopDownloadedResources));

// Xoá tài nguyên của chính user
router.delete('/:id', asyncHandler(authenticateToken), asyncHandler(deleteResource));

// Admin routes
router.get('/admin/all', authenticateToken, requireAdmin, asyncHandler(adminGetAllResources));
router.delete('/admin/:id', authenticateToken, requireAdmin, asyncHandler(adminDeleteResource));
router.patch('/admin/:id/approve', authenticateToken, requireAdmin, asyncHandler(adminApproveResource));

export default router;
