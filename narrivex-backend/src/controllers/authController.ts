import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { authService } from '../services/authService';

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const repo = AppDataSource.getRepository(User);

      const user = await repo.findOne({ where: { email } });
      if (!user || !user.password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await authService.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
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
};