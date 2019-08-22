import express from 'express';

import asyncMiddleware from '../middlewares/asyncMiddleware';
import { register } from '../controllers/regController';

const router = express.Router();

router.post('/users', asyncMiddleware(register));

export default router;
