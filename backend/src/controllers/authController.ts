import { Request, Response } from 'express';
import { PrismaClient } from '.prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/jwt';

const prisma = new PrismaClient();

// Đăng ký
export const register = async (req: Request, res: Response): Promise<Response> => {
  const { email, username, password } = req.body;

  try {
    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, username và password là bắt buộc.' });
    }

    // Kiểm tra trùng email hoặc username
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email hoặc username đã được sử dụng.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword
      }
    });

    return res.status(201).json({
      message: 'Tạo tài khoản thành công.',
      userId: newUser.id
    });

  } catch (err) {
    console.error('Lỗi đăng ký:', err);
    return res.status(500).json({ error: 'Lỗi máy chủ. Vui lòng thử lại sau.' });
  }
};

// Đăng nhập (dùng username hoặc email)
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { identifier, password } = req.body;

  try {
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Vui lòng nhập username/email và mật khẩu.' });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: identifier },
          { email: identifier }
        ]
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Sai mật khẩu.' });
    }

    const token = generateToken({ id: user.id }, '1d');
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    return res.json({
      message: 'Đăng nhập thành công.',
      token,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error('Lỗi đăng nhập:', err);
    return res.status(500).json({ error: 'Không thể đăng nhập. Vui lòng thử lại sau.' });
  }
};
