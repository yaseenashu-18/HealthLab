import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

// Centralized error handler
app.use(errorHandler);

// Server startup function
const startServer = async () => {
  await connectDB();
  const PORT = parseInt(ENV.PORT, 10) || 5000;
  
  app.listen(PORT, () => {
    console.log(`🏥 HealthLab AI Backend Server running on http://localhost:${PORT}`);
    console.log(`🔌 Health status check: http://localhost:${PORT}/api/health`);
  });
};

startServer();
