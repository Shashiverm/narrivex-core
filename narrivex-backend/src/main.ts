import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Server } from 'socket.io';
import { initializeDatabase, runMigrations } from './config/database';
import authRoutes from './routes/auth';
import narrativeRoutes from './routes/narratives';
import assetRoutes from './routes/assets';
import alertRoutes from './routes/alerts';
import healthRoutes from './routes/health';
import { errorHandler } from './middleware/errorHandler';
import { setupWebSocketHandlers, startPriceBroadcast } from './websocket/handlers';
import { alertService } from './services/alertService';
import { logger } from './utils/logger';
import './types';

dotenv.config();

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOrigin = (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
  if (!origin) {
    callback(null, true);
    return;
  }

  callback(null, allowedOrigins.includes(origin));
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.set('trust proxy', 1);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json({ limit: '1mb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use('/api', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/narratives', narrativeRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/', healthRoutes);

app.use(errorHandler);

setupWebSocketHandlers(io);
startPriceBroadcast(io);

async function start() {
  try {
    await initializeDatabase();
    await runMigrations();
    const PORT = Number(process.env.PORT || 3001);
    httpServer.listen(PORT, () => {
      logger.info(`Backend running on http://localhost:${PORT}`);
    });

    setInterval(async () => {
      try {
        await alertService.evaluateAndDispatch();
      } catch (error) {
        logger.error('Alert evaluation failed', error);
      }
    }, 30_000);
  } catch (error) {
    logger.error('Failed to start backend', error);
    process.exit(1);
  }
}

start();