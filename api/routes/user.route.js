import { Router } from 'express';
import { account, post } from '../controllers/user.controller.js';

const router = Router();

router.get('/account/:id', account);
router.get('/post', post);

export default router;
