import { Router } from 'express';
import { create, getposts } from '../controllers/post.controller.js';
import { verifyToken } from '../middlewares/verifyUser.js';

const router = Router();

router.post('/create', verifyToken, create);
router.get('/getposts', verifyToken, getposts);

export default router;
