import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
  user?: { id: string; role?: string };
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Ưu tiên lấy token từ cookie nếu có
  let token = req.cookies?.token;
  if (!token) {
    const authHeader = req.headers['authorization'];
    token = authHeader?.split(' ')[1];
  }

  if (!token) {
    // console.warn('[AUTH] No token provided.');
    res.status(401).json({ error: 'Unauthorized: No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await prisma.user.findUnique({ where: { id: String(decoded.id) } });

    if (!user) {
      console.warn('[AUTH] User not found for id:', decoded.id);
      res.status(401).json({ error: 'Unauthorized: User not found.' });
      return;
    }

    req.user = { id: decoded.id, role: user.role };
    next();
  } catch (err) {
    console.error('[AUTH] Error verifying token:', err);
    if (err instanceof TokenExpiredError) {
      res.status(401).json({ error: 'Token expired. Please log in again.' });
    } else {
      res.status(403).json({ error: 'Forbidden: Invalid token.' });
    }
  }
};

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== 'ADMIN') {
    res.status(403).json({ error: 'Forbidden: Admins only.' });
    return;
  }
  next();
};
