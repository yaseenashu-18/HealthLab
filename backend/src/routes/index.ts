import { Router } from 'express';
import authRoutes from './authRoutes.js';

const router = Router();

// Active Phase 1 routes
router.use('/auth', authRoutes);

// Placeholder health status endpoint
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'HealthLab AI Backend API',
    timestamp: new Date().toISOString(),
  });
});

// Prepared API endpoints placeholder structure for future phases:
// /api/users
// /api/health
// /api/tests
// /api/reports
// /api/doctors
// /api/consultations
// /api/prescriptions
// /api/medicines
// /api/orders
// /api/payments
// /api/membership
// /api/health-ai
// /api/notifications

export default router;
