import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Asset } from '../entities/Asset';

function getParamString(value: string | string[] | undefined): string | null {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value[0] || null;
  return null;
}

export const assetController = {
  async getAssets(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const assets = await AppDataSource.getRepository(Asset).find({ where: { userId } });
    return res.json(assets);
  },

  async addAsset(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { symbol, type = 'crypto' } = req.body;
    if (!symbol) return res.status(400).json({ error: 'Symbol is required' });
    if (type !== 'crypto' && type !== 'stock') {
      return res.status(400).json({ error: 'type must be crypto or stock' });
    }

    const repo = AppDataSource.getRepository(Asset);
    const asset = repo.create({ symbol: symbol.toUpperCase(), name: symbol.toUpperCase(), userId, type });
    await repo.save(asset);
    return res.status(201).json(asset);
  },

  async removeAsset(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const symbolParam = getParamString(req.params.symbol);
    if (!symbolParam) return res.status(400).json({ error: 'Invalid symbol' });
    const symbol = symbolParam.toUpperCase();

    await AppDataSource.getRepository(Asset).delete({ symbol, userId });
    return res.status(204).send();
  },
};