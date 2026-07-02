import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/validate.js';
import { addToWatchlist, getWatchlist, removeFromWatchlist } from '../controllers/watchlistController.js';

const router = express.Router();
router.use(requireAuth);
router.get('/', asyncHandler(getWatchlist));
router.post('/', asyncHandler(addToWatchlist));
router.delete('/:ticker', asyncHandler(removeFromWatchlist));
export default router;
