import express from 'express'
import asyncMiddleware from '../middlewares/asyncMiddleware';
import { getUserInfo } from '../controllers/userController';

const router = express.Router();

router.get('/me', asyncMiddleware(getUserInfo));

export default router;