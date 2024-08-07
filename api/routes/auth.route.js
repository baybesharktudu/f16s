import { Router } from 'express';
import { signin, signup, signupQuery, signupQueryEmail } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/signup/check-username', signupQuery);
router.get('/signup/check-email', signupQueryEmail);

export default router;
