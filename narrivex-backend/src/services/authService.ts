import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

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
};