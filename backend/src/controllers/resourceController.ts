import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/resources
export const getResources = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user?.id;

  try {
    const resources = await prisma.resource.findMany({
      where: { createdBy: userId },
    });
    res.status(200).json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách resource' });
  }
};

// POST /api/resources
export const createResource = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user?.id;
  const { title, subject, fileUrl, originalName } = req.body;

  try {
    const newResource = await prisma.resource.create({
      data: {
        title,
        subject,
        fileUrl,
        originalName,
        createdBy: userId,
      },
    });

    res.status(201).json(newResource);
  } catch (error) {
    console.error('Error creating resource:', error);
    res.status(500).json({
      error: 'An unexpected error occurred while creating the resource. Please try again later.',
    });
  }
};

// GET /api/resources/download/:filename
export const downloadFile = async (req: Request, res: Response): Promise<void> => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../../uploads', filename);

  try {
    const resource = await prisma.resource.findFirst({
      where: { fileUrl: `/uploads/${filename}` },
      select: { originalName: true },
    });

    if (!resource) {
      res.status(404).json({ error: 'Không tìm thấy tài nguyên.' });
      return;
    }

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ error: 'Tệp không tồn tại trên server.' });
      return;
    }

    res.setHeader(
      'Content-Disposition',
      `attachment; filename*=UTF-8''${encodeURIComponent(resource.originalName)}`
    );
    res.download(filePath);
  } catch (error) {
    console.error('Lỗi khi tải file:', error);
    res.status(500).json({ error: 'Lỗi khi tải file.' });
  }
};
