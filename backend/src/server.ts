import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth';
import resourceRoutes from './routes/resource';
import userRoutes from './routes/users';

// ✅ Load .env (ưu tiên backend/.env nhưng fallback sang gốc nếu cần)
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env' : './backend/.env' });

const app = express();

// ✅ Security headers
app.use(helmet());

// ✅ Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Rate limiting cho auth route
app.use(
  '/api/auth',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  })
);

// ✅ Route handling
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/user', userRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('🎉 API is working!');
});

// ✅ Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[SERVER ERROR]:', err.stack);
  res.status(err.status ?? 500).json({ error: err.message ?? 'Internal Server Error' });
});

// ✅ Start server
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at: http://localhost:${PORT}`);
});
