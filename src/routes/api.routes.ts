import express from 'express';
import authRoutes from './apps/auth/auth.routes';
import problemsRoutes from './apps/problems/problems.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/problems', problemsRoutes);

export default router;
