import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import resourceRoutes from './routes/resource';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('api/auth', authRoutes);
app.use('api/resources', resourceRoutes);

app.get('/', (req, res) => {
  res.send('🎉 API is working!');
});

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
