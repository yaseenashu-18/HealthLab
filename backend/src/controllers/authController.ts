import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService.js';
import { AuthRequest } from '../types/index.js';

export class AuthController {
  static async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.signUp(req.body);
      res.status(201).json({
        success: true,
        message: 'Account created successfully.',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to create account.',
      });
    }
  }

  static async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.signIn(req.body);
      res.status(200).json({
        success: true,
        message: 'Signed in successfully.',
        data: result,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || 'Authentication failed.',
      });
    }
  }

  static async me(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ success: false, message: 'Unauthorized.' });
        return;
      }

      const user = await AuthService.getMe(req.user.id);
      res.status(200).json({
        success: true,
        data: { user },
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'User profile not found.',
      });
    }
  }

  static async logout(_req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully.',
    });
  }

  static async forgotPassword(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    // Password reset simulation response for privacy and security
    res.status(200).json({
      success: true,
      message: `If an account with ${email} exists, password reset instructions have been sent.`,
    });
  }
}
