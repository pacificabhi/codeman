import express from 'express';
import { getAllProblemsHandler } from '../../../controllers/apps/problems/problems.controller';

const router = express.Router();

router.route('/').get(getAllProblemsHandler);

export default router;
