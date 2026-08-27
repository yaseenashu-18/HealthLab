import { Router } from 'express';
import { z } from 'zod';
import { AuthController } from '../controllers/authController.js';
import { validateRequest } from '../middleware/validateMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

const roleEnum = z.enum(['user', 'doctor', 'lab_technician', 'pharmacy']);

const signUpSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(7, 'Please enter a valid phone number.'),
  role: roleEnum.default('user'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword'],
});

const signInSchema = z.object({
  role: roleEnum.default('user'),
  emailOrPhone: z.string().min(1, 'Email or phone number is required.'),
  password: z.string().min(1, 'Password is required.'),
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

router.post('/signup', validateRequest(signUpSchema), AuthController.signUp);
router.post('/signin', validateRequest(signInSchema), AuthController.signIn);
router.post('/logout', AuthController.logout);
router.post('/forgot-password', validateRequest(forgotPasswordSchema), AuthController.forgotPassword);
router.get('/me', authMiddleware, AuthController.me);

export default router;
