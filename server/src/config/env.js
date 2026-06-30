import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sb-stocks',
  jwtSecret: process.env.JWT_SECRET || 'dev-only-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  startingCash: Number(process.env.STARTING_CASH || 100000),
  finnhubApiKey: process.env.FINNHUB_API_KEY || '',
  marketCacheTtl: Number(process.env.MARKET_CACHE_TTL_SECONDS || 45)
};
