import { Router } from 'express';
import { create, getposts, getpostAccount } from '../controllers/post.controller.js';
import { verifyToken } from '../middlewares/verifyUser.js';

const router = Router();

router.post('/create', verifyToken, create);
router.get('/getposts', verifyToken, getposts);
router.get('/getposts/:id', verifyToken, getpostAccount);

export default router;
