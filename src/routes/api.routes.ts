import express from 'express'
import userRoutes from './apps/auth/user.routes'

const router = express.Router();

router.use('/user', userRoutes)


export default router