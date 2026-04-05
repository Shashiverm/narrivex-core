import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Alert } from '../entities/Alert';

function getParamString(value: string | string[] | undefined): string | null {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value[0] || null;
  return null;
}

export const alertController = {
  async getRules(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const rules = await AppDataSource.getRepository(Alert).find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    return res.json(rules);
  },

  async createRule(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { symbol, ruleType, threshold, channel = 'email', enabled = true } = req.body;
    if (!symbol || !ruleType || threshold === undefined) {
      return res.status(400).json({ error: 'symbol, ruleType and threshold are required' });
    }

    const repo = AppDataSource.getRepository(Alert);
    const rule = repo.create({
      symbol: String(symbol).toUpperCase(),
      ruleType: String(ruleType),
      threshold: Number(threshold),
      channel: String(channel),
      enabled: Boolean(enabled),
      userId,
    });
    await repo.save(rule);

    return res.status(201).json(rule);
  },

  async updateRule(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const id = getParamString(req.params.id);
    if (!id) return res.status(400).json({ error: 'Invalid rule id' });

    const repo = AppDataSource.getRepository(Alert);
    const existing = await repo.findOne({ where: { id, userId } });

    if (!existing) return res.status(404).json({ error: 'Rule not found' });

    const patch = req.body as Partial<Alert>;
    existing.symbol = patch.symbol ? String(patch.symbol).toUpperCase() : existing.symbol;
    existing.ruleType = patch.ruleType ?? existing.ruleType;
    existing.threshold = patch.threshold !== undefined ? Number(patch.threshold) : existing.threshold;
    existing.channel = patch.channel ?? existing.channel;
    existing.enabled = patch.enabled ?? existing.enabled;

    await repo.save(existing);
    return res.json(existing);
  },

  async deleteRule(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const id = getParamString(req.params.id);
    if (!id) return res.status(400).json({ error: 'Invalid rule id' });

    await AppDataSource.getRepository(Alert).delete({ id, userId });
    return res.status(204).send();
  },
};