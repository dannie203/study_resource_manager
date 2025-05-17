import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMe = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user?.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: String(userId) }, // ép kiểu cho chắc
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

    res.setHeader('Cache-Control', 'no-store'); // Không cho phép cache, luôn trả về 200
    res.json(user); 
  } catch (error) {
    console.error('Lỗi khi lấy thông tin user:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách user:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, username: true, email: true, role: true },
    });
    res.json(user);
  } catch (error) {
    console.error('Lỗi khi cập nhật role user:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    console.error('Lỗi khi xoá user:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

export const getUserStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();
    res.json({ totalUsers });
  } catch (error) {
    console.error('Lỗi khi lấy tổng số user:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};
