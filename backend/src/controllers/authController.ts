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

  // Validate input
  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Email, username và password là bắt buộc.' });
  }
  // Validate email format
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Email không hợp lệ.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Mật khẩu phải có ít nhất 6 ký tự.' });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email hoặc username đã được sử dụng.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { email, username, password: hashedPassword }
    });
    return res.status(201).json({
      message: 'Tạo tài khoản thành công.',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar ?? null
      }
    });

  } catch (err) {
    console.error('Lỗi đăng ký:', err);
    return res.status(500).json({ error: 'Lỗi máy chủ. Vui lòng thử lại sau.' });
  }
};

// Đăng nhập
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { identifier, password } = req.body;

  // Validate input
  if (!identifier || !password) {
    return res.status(400).json({ error: 'Vui lòng nhập username/email và mật khẩu.' });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { OR: [{ username: identifier }, { email: identifier }] }
    });
    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Sai mật khẩu.' });
    }
    const token = generateToken({ id: user.id, role: user.role }, '1d');
    const refreshToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    // Set JWT as httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    return res.json({
      message: 'Đăng nhập thành công.',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar ?? null
      }
    });

  } catch (err) {
    console.error('Lỗi đăng nhập:', err);
    return res.status(500).json({ error: 'Không thể đăng nhập. Vui lòng thử lại sau.' });
  }
};

// Đăng xuất: xóa cookie token và refreshToken
export const logout = async (req: Request, res: Response): Promise<Response> => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });
    return res.json({ message: 'Đăng xuất thành công.' });
  } catch (err) {
    console.error('Lỗi đăng xuất:', err);
    return res.status(500).json({ error: 'Không thể đăng xuất. Vui lòng thử lại sau.' });
  }
};

// Gửi liên kết reset mật khẩu qua email
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

    const resetUrl = `http://localhost:3000/auth/reset-password?token=${resetToken}`;

    await sendEmail(
      user.email,
      'Yêu cầu đặt lại mật khẩu',
      `<p>Chào ${user.username},</p>
       <p>Bạn đã yêu cầu đặt lại mật khẩu. Nhấn vào liên kết bên dưới để tiếp tục:</p>
       <a href="${resetUrl}" target="_blank">${resetUrl}</a>
       <p>Liên kết sẽ hết hạn sau 15 phút.</p>`
    );

    return res.json({ message: 'Liên kết đặt lại mật khẩu đã được gửi tới email (nếu tồn tại).' });

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

// ✅ Kiểm tra token còn hợp lệ hay không
export const validateResetToken = async (req: Request, res: Response): Promise<Response> => {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Token không hợp lệ.' });
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
      return res.status(400).json({ error: 'Token không tồn tại hoặc đã hết hạn.' });
    }

    return res.json({ message: 'Token hợp lệ.' });

  } catch (err) {
    console.error('Lỗi kiểm tra token:', err);
    return res.status(500).json({ error: 'Không thể xác thực token.' });
  }
};

// Refresh token endpoint
export const refreshToken = async (req: Request, res: Response): Promise<Response> => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token là bắt buộc.' });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as { id: string, role: string };
    // Có thể kiểm tra blacklist refresh token ở đây nếu muốn
    const accessToken = generateToken({ id: decoded.id, role: decoded.role }, '1d');
    return res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ error: 'Refresh token không hợp lệ hoặc đã hết hạn.' });
  }
};
