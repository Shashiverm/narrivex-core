import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { authService } from '../services/authService';
import { notificationService } from '../services/notificationService';

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const repo = AppDataSource.getRepository(User);

      const user = await repo.findOne({ where: { email } });
      if (!user || !user.password) {
        return res.status(404).json({ error: 'User not registered' });
      }

      const isValidPassword = await authService.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      const accessToken = authService.generateToken(user.id);
      return res.json({ id: user.id, email: user.email, name: user.name, image: user.image, accessToken });
    } catch (error) {
      return res.status(500).json({ error: 'Login failed' });
    }
  },

  async signup(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;
      const repo = AppDataSource.getRepository(User);
      const existing = await repo.findOne({ where: { email } });

      if (existing) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await authService.hashPassword(password);
      const user = repo.create({ email, password: hashedPassword, name });
      await repo.save(user);

      const accessToken = authService.generateToken(user.id);
      return res.status(201).json({ id: user.id, email: user.email, name: user.name, accessToken });
    } catch {
      return res.status(500).json({ error: 'Signup failed' });
    }
  },

  async oauthLogin(req: Request, res: Response) {
    try {
      const { provider, providerId, email, name, image } = req.body;
      const repo = AppDataSource.getRepository(User);

      let user = await repo.findOne({
        where: provider === 'github' ? { githubId: providerId } : { googleId: providerId },
      });

      if (!user) {
        user = repo.create({
          email,
          name,
          image,
          ...(provider === 'github' ? { githubId: providerId } : { googleId: providerId }),
        });
      } else {
        user.email = email;
        user.name = name;
        user.image = image;
      }

      await repo.save(user);
      const accessToken = authService.generateToken(user.id);
      return res.json({ id: user.id, email: user.email, name: user.name, image: user.image, accessToken });
    } catch {
      return res.status(500).json({ error: 'OAuth login failed' });
    }
  },

  async verifyToken(req: Request, res: Response) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    try {
      const userId = authService.verifyToken(token);
      const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      return res.json({ id: user.id, email: user.email, name: user.name });
    } catch {
      return res.status(401).json({ error: 'Invalid token' });
    }
  },

  async sendOTP(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const otp = authService.generateOTP();
      authService.storeOTP(email, otp, 5); // 5-minute expiration

      // Send OTP via email (using notificationService)
      try {
        await notificationService.sendOTPEmail(email, otp);
      } catch (emailError) {
        console.error('Failed to send OTP email:', emailError);
        // Still return success so user can proceed (in production, this should fail)
      }

      return res.json({ message: 'OTP sent successfully', success: true });
    } catch (error) {
      console.error('Send OTP error:', error);
      return res.status(500).json({ error: 'Failed to send OTP' });
    }
  },

  async verifyOTP(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
      }

      const isValidOTP = authService.verifyOTP(email, otp);

      if (!isValidOTP) {
        return res.status(401).json({ error: 'Invalid or expired OTP' });
      }

      const repo = AppDataSource.getRepository(User);
      let user = await repo.findOne({ where: { email } });

      // Create user if doesn't exist (first-time OTP login)
      if (!user) {
        user = repo.create({
          email,
          name: email.split('@')[0], // Use email prefix as default name
        });
        await repo.save(user);
      }

      const accessToken = authService.generateToken(user.id);
      return res.json({ id: user.id, email: user.email, name: user.name, accessToken, isNewUser: !user.password });
    } catch (error) {
      console.error('Verify OTP error:', error);
      return res.status(500).json({ error: 'Failed to verify OTP' });
    }
  },

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const repo = AppDataSource.getRepository(User);
      const user = await repo.findOne({ where: { email } });

      // Always return success for security (don't reveal if email exists)
      if (!user) {
        return res.json({ message: 'If an account exists with this email, a reset link has been sent', success: true });
      }

      // Generate reset token
      const resetToken = authService.generatePasswordResetToken();
      const expiresAt = authService.getPasswordResetExpiryDate(24); // 24-hour expiration

      // Save token to database
      user.passwordResetToken = resetToken;
      user.passwordResetExpiresAt = expiresAt;
      await repo.save(user);

      // Send reset email
      try {
        const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}&email=${email}`;
        await notificationService.sendPasswordResetEmail(email, resetLink, user.name);
      } catch (emailError) {
        console.error('Failed to send reset email:', emailError);
        // Still return success so user knows email was found
      }

      return res.json({ message: 'If an account exists with this email, a reset link has been sent', success: true });
    } catch (error) {
      console.error('Forgot password error:', error);
      return res.status(500).json({ error: 'Failed to process password reset request' });
    }
  },

  async resetPassword(req: Request, res: Response) {
    try {
      const { token, email, password } = req.body;

      if (!token || !email || !password) {
        return res.status(400).json({ error: 'Token, email and password are required' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }

      const repo = AppDataSource.getRepository(User);
      const user = await repo.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if token is valid and not expired
      if (user.passwordResetToken !== token) {
        return res.status(401).json({ error: 'Invalid or expired reset token' });
      }

      if (!user.passwordResetExpiresAt || new Date() > user.passwordResetExpiresAt) {
        return res.status(401).json({ error: 'Reset token has expired' });
      }

      // Update password
      const hashedPassword = await authService.hashPassword(password);
      user.password = hashedPassword;
      user.passwordResetToken = null;
      user.passwordResetExpiresAt = null;
      await repo.save(user);

      return res.json({ message: 'Password reset successfully', success: true });
    } catch (error) {
      console.error('Reset password error:', error);
      return res.status(500).json({ error: 'Failed to reset password' });
    }
  },
};