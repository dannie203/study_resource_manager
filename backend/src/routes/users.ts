import express from 'express';
import { getMe, getAllUsers, updateUserRole, deleteUser, getUserStats } from '../controllers/userController';
import { uploadAvatar } from '../controllers/userController';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler'; 
import multer from 'multer';

const router = express.Router();

const avatarUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'avatar/'); // Lưu avatar vào thư mục avatar riêng
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      cb(null, `avatar-${Date.now()}.${ext}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Chỉ hỗ trợ file ảnh.'));
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

router.get('/me', authenticateToken, asyncHandler(getMe)); 
router.post('/me/avatar', authenticateToken, avatarUpload.single('avatar'), asyncHandler(uploadAvatar));

// Admin routes
router.get('/', authenticateToken, requireAdmin, asyncHandler(getAllUsers));
router.get('/stats', authenticateToken, requireAdmin, asyncHandler(getUserStats));
router.patch('/:id/role', authenticateToken, requireAdmin, asyncHandler(updateUserRole));
router.delete('/:id', authenticateToken, requireAdmin, asyncHandler(deleteUser));

export default router;
