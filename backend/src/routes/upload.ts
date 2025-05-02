import express from 'express';
import { uploadFile } from '../controllers/uploadController';
import { authenticateToken } from '../middleware/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler'; 

const router = express.Router();

router.post('/', authenticateToken, asyncHandler(uploadFile)); 

export default router;
