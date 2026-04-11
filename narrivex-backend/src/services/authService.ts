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
const redisUrl = process.env.REDIS_URL;

type RedisLikeClient = {
  status: string;
  connect: () => Promise<unknown>;
  set: (key: string, value: string, mode: 'EX', seconds: number) => Promise<unknown>;
  get: (key: string) => Promise<string | null>;
  del: (key: string) => Promise<number>;
};

function createRedisClient(url: string | undefined): RedisLikeClient | null {
  if (!url) {
    return null;
  }

  try {
    const dynamicRequire = eval('require') as NodeRequire;
    const RedisCtor = dynamicRequire('ioredis') as new (
      redisUrl: string,
      options: { lazyConnect: boolean; maxRetriesPerRequest: number }
    ) => RedisLikeClient;

    return new RedisCtor(url, { lazyConnect: true, maxRetriesPerRequest: 1 });
  } catch {
    return null;
  }
}

const redisClient = createRedisClient(redisUrl);

if (redisClient) {
  redisClient.connect().catch(() => {
    // Fallback to in-memory OTP if Redis is temporarily unavailable.
  });
}

// In-memory OTP storage (use Redis in production)
const otpStore: Record<string, { code: string; expiresAt: number }> = {};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function otpKey(email: string): string {
  return `otp:${normalizeEmail(email)}`;
}

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

  async storeOTP(email: string, otp: string, expirationMinutes: number = 5): Promise<void> {
    const normalizedEmail = normalizeEmail(email);

    if (redisClient && redisClient.status === 'ready') {
      try {
        await redisClient.set(otpKey(normalizedEmail), otp, 'EX', expirationMinutes * 60);
        return;
      } catch {
        // Continue with in-memory fallback if Redis write fails.
      }
    }

    const expiresAt = Date.now() + expirationMinutes * 60 * 1000;
    otpStore[normalizedEmail] = { code: otp, expiresAt };
  },

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    const normalizedEmail = normalizeEmail(email);

    if (redisClient && redisClient.status === 'ready') {
      try {
        const storedOtp = await redisClient.get(otpKey(normalizedEmail));
        if (!storedOtp) {
          return false;
        }

        const isValidRedisOtp = storedOtp === otp;
        if (isValidRedisOtp) {
          await redisClient.del(otpKey(normalizedEmail));
        }
        return isValidRedisOtp;
      } catch {
        // Continue with in-memory fallback if Redis read fails.
      }
    }

    const stored = otpStore[normalizedEmail];

    if (!stored) {
      return false;
    }

    if (Date.now() > stored.expiresAt) {
      delete otpStore[normalizedEmail];
      return false;
    }

    const isValid = stored.code === otp;
    if (isValid) {
      delete otpStore[normalizedEmail];
    }

    return isValid;
  },

  async clearOTP(email: string): Promise<void> {
    const normalizedEmail = normalizeEmail(email);

    if (redisClient && redisClient.status === 'ready') {
      try {
        await redisClient.del(otpKey(normalizedEmail));
      } catch {
        // Ignore Redis clear errors and continue with local clear.
      }
    }

    delete otpStore[normalizedEmail];
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