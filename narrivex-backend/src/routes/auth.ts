import { Router } from 'express';
import { z } from 'zod';
import { authController } from '../controllers/authController';
import { validateInput } from '../middleware/validation';

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

const oauthSchema = z.object({
  provider: z.enum(['github', 'google']),
  providerId: z.string(),
  email: z.string().email(),
  name: z.string().min(2),
  image: z.string().optional(),
});

router.post('/login', validateInput(loginSchema), authController.login);
router.post('/signup', validateInput(signupSchema), authController.signup);
router.post('/oauth', validateInput(oauthSchema), authController.oauthLogin);
router.post('/verify', authController.verifyToken);

export default router;