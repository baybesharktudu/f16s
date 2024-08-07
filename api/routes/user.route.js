import { Router } from 'express';
import { account } from '../controllers/user.controller.js';

const router = Router();

router.get('/account/:id', account);

export default router;
