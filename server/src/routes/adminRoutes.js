import express from 'express';
import { createStock, deleteStock, listStocks, updateStock } from '../controllers/adminController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/validate.js';

const router = express.Router();
router.use(requireAuth, requireAdmin);
router.get('/stocks', asyncHandler(listStocks));
router.post('/stocks', asyncHandler(createStock));
router.put('/stocks/:id', asyncHandler(updateStock));
router.delete('/stocks/:id', asyncHandler(deleteStock));
export default router;
