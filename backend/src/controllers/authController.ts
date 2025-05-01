import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { generateToken } from '../utils/jwt';
import { sendEmail } from '../utils/sendEmail';

const prisma = new PrismaClient();

// Đăng ký
export const register = async (req: Request, res: Response): Promise<Response> => {
  const { email, username, password } = req.body;

  try {
    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, username và password là bắt buộc.' });
    }

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

// Đăng nhập
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

// Gửi email reset mật khẩu
export const requestPasswordReset = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email là bắt buộc.' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(resetToken, 10);
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 phút

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: hashedToken,
        passwordResetExpires: expires,
      }
    });

    await sendEmail(
      user.email,
      'Yêu cầu đặt lại mật khẩu',
      `<p>Chào ${user.username},</p>
       <p>Bạn đã yêu cầu đặt lại mật khẩu. Dưới đây là mã token:</p>
       <code>${resetToken}</code>
       <p>Mã này sẽ hết hạn sau 15 phút.</p>`
    );

    return res.json({ message: 'Đã gửi email reset mật khẩu (nếu email tồn tại).' });

  } catch (err) {
    console.error('Lỗi tạo token reset:', err);
    return res.status(500).json({ error: 'Lỗi máy chủ khi gửi yêu cầu.' });
  }
};

// Reset mật khẩu bằng token
export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token và mật khẩu mới là bắt buộc.' });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        passwordResetExpires: { gt: new Date() },
        NOT: { passwordResetToken: null },
      },
    });

    const user = users.find(u => bcrypt.compareSync(token, u.passwordResetToken!));

    if (!user) {
      return res.status(400).json({ error: 'Token không hợp lệ hoặc đã hết hạn.' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedNewPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    return res.json({ message: 'Đã cập nhật mật khẩu thành công.' });

  } catch (err) {
    console.error('Lỗi reset mật khẩu:', err);
    return res.status(500).json({ error: 'Không thể reset mật khẩu.' });
  }
};
