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
  name: z.string().min(2).optional(),
  image: z.string().optional(),
});

const sendOTPSchema = z.object({
  email: z.string().email(),
});

const verifyOTPSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  token: z.string().min(32),
  email: z.string().email(),
  password: z.string().min(6),
});

router.post('/login', validateInput(loginSchema), authController.login);
router.post('/signup', validateInput(signupSchema), authController.signup);
router.post('/oauth', validateInput(oauthSchema), authController.oauthLogin);
router.post('/send-otp', validateInput(sendOTPSchema), authController.sendOTP);
router.post('/verify-otp', validateInput(verifyOTPSchema), authController.verifyOTP);
router.post('/forgot-password', validateInput(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validateInput(resetPasswordSchema), authController.resetPassword);
router.post('/verify', authController.verifyToken);

export default router;