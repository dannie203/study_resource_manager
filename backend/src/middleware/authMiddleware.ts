import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
  user?: { id: string };
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Unauthorized: No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const user = await prisma.user.findUnique({ where: { id: String(decoded.id) } });

    if (!user) {
      res.status(401).json({ error: 'Unauthorized: User not found.' });
      return;
    }

    req.user = { id: decoded.id };
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      res.status(401).json({ error: 'Token expired. Please log in again.' });
    } else {
      console.error('Error verifying token:', err);
      res.status(403).json({ error: 'Forbidden: Invalid token.' });
    }
  }
};
