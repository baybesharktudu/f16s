import { Router } from 'express';
import { create } from '../controllers/post.controller.js';
import { verifyToken } from '../middlewares/verifyUser.js';

const router = Router();

router.post('/create', verifyToken, create);

export default router;
