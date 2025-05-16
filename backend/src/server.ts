import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import morgan from 'morgan';
import expressStatusMonitor from 'express-status-monitor';

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

// ✅ Monitoring
app.use(expressStatusMonitor());

// ✅ Logging
app.use(morgan('dev'));

// ✅ Security headers
app.use(helmet());

// ✅ Enable CORS
app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true,
}));

// ✅ Body parser
app.use(express.json());

// ✅ Rate limiting cho toàn bộ API
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 phút
//     max: 100, // 100 requests mỗi 15 phút
//     message: 'Too many requests from this IP, please try again after 15 minutes.',
//   })
// );

// ✅ Static files: serve uploaded resources
app.use('/uploads', express.static(UPLOADS_DIR));

// ✅ Audit log middleware (log các thay đổi dữ liệu)
app.use((req, res, next) => {
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    console.log(`[AUDIT] ${req.method} ${req.originalUrl} - User: ${req.user?.id ?? 'unknown'}`);
  }
  next();
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/users', userRoutes); // Sửa lại từ 'user' thành 'users' để đúng route
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
