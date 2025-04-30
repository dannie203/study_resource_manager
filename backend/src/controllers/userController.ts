import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMe = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user?.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) }, // ép kiểu cho chắc
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: 'Không tìm thấy người dùng' });
      return;
    }

    res.json(user); 
  } catch (error) {
    console.error('Lỗi khi lấy thông tin user:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};
