import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { decodeFileName } from '../utils/stringHelper';
import { scanFile } from '../utils/clamav';

const prisma = new PrismaClient();

// Multer config
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, '../../uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileName: string | null = decodeFileName(file.originalname);
      cb(null, `${uniqueSuffix}-${fileName}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and DOCX files are allowed.'));
    }
  },
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB
  },
}).single('file');

// Controller
export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    try {
      const { title, subject } = req.body;
      const userId = (req as any).user?.id;

      // Validate input
      if (!title?.trim()) {
        return res.status(400).json({ error: 'Tiêu đề tài liệu là bắt buộc.' });
      }
      if (!subject?.trim()) {
        return res.status(400).json({ error: 'Môn học là bắt buộc.' });
      }
      if (!userId || typeof userId !== 'string') {
        return res.status(401).json({ error: 'Unauthorized: Invalid user ID.' });
      }

      // Quét virus bằng ClamAV
      const scanResult = await scanFile(req.file.path);
      if (scanResult.isInfected) {
        // Xóa file nhiễm virus
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ error: `File bị nhiễm virus: ${scanResult.viruses?.join(', ') || 'Unknown malware'}` });
      }

      // Decode POST-ed data
      const fileName: string | null = decodeFileName(req.file.originalname);
      if(!fileName) {
        return res.status(400).json({ error: 'Invalid filename!' })
      }

      const resource = await prisma.resource.create({
        data: {
          title,
          subject,
          fileUrl: `/uploads/${req.file.filename}`,
          originalName: fileName,
          createdBy: userId,
        },
      });

      res.status(201).json({
        message: 'File uploaded successfully.',
        resource,
      });
    } catch (error) {
      console.error('Error processing uploaded file:', error);
      res.status(500).json({
        error: 'An unexpected error occurred while processing the uploaded file.',
      });
    }
  });
};
