import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { env } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import stockRoutes from './routes/stockRoutes.js';
import tradeRoutes from './routes/tradeRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

export const createApp = () => {
  const app = express();
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const clientDist = path.resolve(currentDir, '../../client/dist');

  app.use(helmet());
  app.use(cors({ origin: env.clientOrigin, credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

  app.get('/api/health', (req, res) => res.json({ ok: true, service: 'sb-stocks-api' }));
  app.use('/api/auth', authRoutes);
  app.use('/api/stocks', stockRoutes);
  app.use('/api', tradeRoutes);
  app.use('/api/watchlist', watchlistRoutes);
  app.use('/api/admin', adminRoutes);
  if (env.nodeEnv === 'production') {
    app.use(express.static(clientDist));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) return next();
      return res.sendFile(path.join(clientDist, 'index.html'));
    });
  }
  app.use(notFound);
  app.use(errorHandler);

  return app;
};
