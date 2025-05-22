import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import cookieParser from 'cookie-parser';

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

// ✅ Cookie parser
app.use(cookieParser());

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

// ✅ Static files: serve avatar images with CORS (fix NotSameOrigin)
const AVATAR_DIR = path.join(__dirname, '../avatar');

// Tắt helmet cho route /avatar để không set các header same-origin gây block
app.use('/avatar', (req, res, next) => {
  // Bỏ các header bảo mật gây block cross-origin
  res.removeHeader?.('Cross-Origin-Opener-Policy');
  res.removeHeader?.('Cross-Origin-Resource-Policy');
  res.removeHeader?.('X-Frame-Options');
  res.setHeader('Cross-Origin-Opener-Policy', '');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('X-Frame-Options', '');
  next();
},
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  }),
  express.static(AVATAR_DIR, {
    setHeaders: (res) => {
      res.setHeader('Access-Control-Allow-Origin', CLIENT_ORIGIN);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Cross-Origin-Opener-Policy', '');
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      res.setHeader('X-Frame-Options', '');
    }
  })
);

// ✅ Static files: serve public resources  
app.use('/public', express.static(path.join(__dirname, '../../uploads')));

// Log all API requests and responses
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    if (res.statusCode >= 400) {
      console.log('  Request headers:', req.headers);
      if (req.body && Object.keys(req.body).length > 0) {
        console.log('  Request body:', req.body);
      }
    }
  });
  next();
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/users', userRoutes);
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
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running at: http://localhost:${PORT}`);
});
