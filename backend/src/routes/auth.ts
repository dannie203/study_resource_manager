import express, { Request, Response, NextFunction } from 'express';
import {
  register,
  login,
  requestPasswordReset,
  resetPassword,
  validateResetToken,
  refreshToken,
  logout // Thêm logout controller
} from '../controllers/authController';

const router = express.Router();

// Middleware bắt lỗi async
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Auth routes
router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.post('/request-reset', asyncHandler(requestPasswordReset));
router.post('/reset-password', asyncHandler(resetPassword));
router.get('/validate-reset-token', asyncHandler(validateResetToken));
router.post('/refresh-token', asyncHandler(refreshToken));
router.post('/logout', asyncHandler(logout)); // Thêm route logout

export default router;
