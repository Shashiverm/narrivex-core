import { Router } from 'express';
import { AppDataSource } from '../config/database';

const router = Router();

router.get('/health', (_req, res) => {
  const memUsage = process.memoryUsage();

  return res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: AppDataSource.isInitialized ? 'connected' : 'disconnected',
    memory: {
      heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)} MB`,
    },
    uptime: process.uptime(),
  });
});

export default router;