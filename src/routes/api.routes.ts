import express from 'express'
import userRoutes from './apps/auth/auth.routes'
import { apiRateLimit } from '../middlewares/apps/auth/rate.limiter.middlewares';

const router = express.Router();

router.use('/user',apiRateLimit, userRoutes)


export default router