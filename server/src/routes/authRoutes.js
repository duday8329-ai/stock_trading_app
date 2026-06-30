import express from 'express';
import rateLimit from 'express-rate-limit';
import { asyncHandler } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';
import { login, me, register } from '../controllers/authController.js';

const router = express.Router();
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 25, standardHeaders: true, legacyHeaders: false });

router.post('/register', authLimiter, asyncHandler(register));
router.post('/login', authLimiter, asyncHandler(login));
router.get('/me', requireAuth, asyncHandler(me));

export default router;
