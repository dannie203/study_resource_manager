import { Request, Response } from 'express';
import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();

export const getResources = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  try {
    const resources = await prisma.resource.findMany({
      where: { createdBy: userId },
    });
    res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách resource' });
  }
};

export const createResource = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const { title, subject, fileUrl } = req.body;

  try {
    const newResource = await prisma.resource.create({
      data: {
        title,
        subject,
        fileUrl,
        createdBy: userId,
      },
    });
    res.status(201).json(newResource);
  } catch (error) {
    console.error('Error creating resource:', error);
    res.status(500).json({ error: 'An unexpected error occurred while creating the resource. Please try again later.' });
  }
};
