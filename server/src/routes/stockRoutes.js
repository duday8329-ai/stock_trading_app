import express from 'express';
import { asyncHandler } from '../middleware/validate.js';
import { history, quote, search } from '../controllers/stockController.js';

const router = express.Router();

router.get('/search', asyncHandler(search));
router.get('/quote/:ticker', asyncHandler(quote));
router.get('/history/:ticker', asyncHandler(history));

export default router;
