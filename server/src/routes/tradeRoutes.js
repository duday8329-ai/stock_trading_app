import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/validate.js';
import { buy, getPortfolio, sell, transactions } from '../controllers/portfolioController.js';

const router = express.Router();

router.use(requireAuth);
router.post('/trade/buy', asyncHandler(buy));
router.post('/trade/sell', asyncHandler(sell));
router.get('/portfolio', asyncHandler(getPortfolio));
router.get('/transactions', asyncHandler(transactions));

export default router;
