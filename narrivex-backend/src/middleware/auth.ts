import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization token' });
  }

  try {
    const token = header.replace('Bearer ', '');
    const userId = authService.verifyToken(token);
    req.user = { id: userId };
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}