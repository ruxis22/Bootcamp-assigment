import express from 'express';

import asyncMiddleware from '../middlewares/syncMiddleware';
import { logIn } from '../controllers/loginController';

const router = express.Router();

router.post('/session', asyncMiddleware(logIn));

export default router;
