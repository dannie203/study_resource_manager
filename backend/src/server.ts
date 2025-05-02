import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';

// Load routes
import authRoutes from './routes/auth';
import resourceRoutes from './routes/resource';
import userRoutes from './routes/users';
import uploadRoutes from './routes/upload';

// ✅ Load environment variables
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env' : './backend/.env' });

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? 'http://localhost:3000';
const UPLOADS_DIR = path.join(__dirname, '../uploads');

// ✅ Security headers
app.use(helmet());

// ✅ Enable CORS
app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true,
}));

// ✅ Body parser
app.use(express.json());

// ✅ Rate limiting for auth
app.use(
  '/api/auth',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  })
);

// ✅ Static files: serve uploaded resources
app.use('/uploads', express.static(UPLOADS_DIR));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/user', userRoutes);
app.use('/api/upload', uploadRoutes);

// ✅ Health check
app.get('/', (req: Request, res: Response) => {
  res.send('🎉 API is working!');
});

// ✅ Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[SERVER ERROR]:', err.stack);
  res.status(err.status ?? 500).json({ error: err.message ?? 'Internal Server Error' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at: http://localhost:${PORT}`);
});
