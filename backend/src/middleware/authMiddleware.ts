import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { TokenExpiredError } from 'jsonwebtoken';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: { id: string };
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const user = await prisma.user.findUnique({ where: { id: String(decoded.id) } });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: User not found.' });
    }

    req.user = { id: decoded.id };
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({ error: 'Token expired. Please log in again.' });
    }
    console.error('Error verifying token:', err);
    return res.status(403).json({ error: 'Forbidden: Invalid token.' });
  }
};