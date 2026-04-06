import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

const isProduction = process.env.NODE_ENV === 'production';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = '30d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be set');
}

if (isProduction && JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be set to a strong value in production (min 32 chars)');
}

const signingSecret = JWT_SECRET;

// In-memory OTP storage (use Redis in production)
const otpStore: Record<string, { code: string; expiresAt: number }> = {};

export const authService = {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
  },

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcryptjs.compare(password, hashedPassword);
  },

  generateToken(userId: string): string {
    return jwt.sign({ userId }, signingSecret, { expiresIn: JWT_EXPIRATION });
  },

  verifyToken(token: string): string {
    const decoded = jwt.verify(token, signingSecret) as { userId: string };
    return decoded.userId;
  },

  generateOTP(): string {
    // Generate a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  storeOTP(email: string, otp: string, expirationMinutes: number = 5): void {
    const expiresAt = Date.now() + expirationMinutes * 60 * 1000;
    otpStore[email] = { code: otp, expiresAt };
  },

  verifyOTP(email: string, otp: string): boolean {
    const stored = otpStore[email];

    if (!stored) {
      return false;
    }

    if (Date.now() > stored.expiresAt) {
      delete otpStore[email];
      return false;
    }

    const isValid = stored.code === otp;
    if (isValid) {
      delete otpStore[email];
    }

    return isValid;
  },

  clearOTP(email: string): void {
    delete otpStore[email];
  },

  generatePasswordResetToken(): string {
    // Generate a cryptographically secure random token
    return crypto.randomBytes(32).toString('hex');
  },

  getPasswordResetExpiryDate(expirationHours: number = 24): Date {
    const now = new Date();
    return new Date(now.getTime() + expirationHours * 60 * 60 * 1000);
  },
};