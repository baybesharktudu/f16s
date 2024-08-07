import { Router } from 'express';
import { account, signout } from '../controllers/user.controller.js';

const router = Router();

router.get('/account/:id', account);
router.post('/signout', signout);

export default router;
