import { Router } from 'express';
import { account, signout } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/verifyUser.js';

const router = Router();

router.get('/account/:id', verifyToken, account);
router.post('/signout', verifyToken, signout);

export default router;
