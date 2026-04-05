import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Narrative } from '../entities/Narrative';
import { narrativeEngine } from '../services/narrativeEngine';
import { dataIngestionService } from '../services/dataIngestionService';

function getParamString(value: string | string[] | undefined): string | null {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value[0] || null;
  return null;
}

function getQueryNumber(value: unknown, fallback: number): number {
  if (typeof value === 'string') return parseInt(value, 10);
  if (Array.isArray(value) && typeof value[0] === 'string') return parseInt(value[0], 10);
  return fallback;
}

export const narrativeController = {
  async getNarrative(req: Request, res: Response) {
    try {
      const symbol = getParamString(req.params.symbol);
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });
      if (!symbol) return res.status(400).json({ error: 'Invalid symbol' });

      const repo = AppDataSource.getRepository(Narrative);
      let narrative = await repo.findOne({ where: { symbol, userId }, order: { createdAt: 'DESC' } });

      if (!narrative || Date.now() - narrative.createdAt.getTime() > 5 * 60 * 1000) {
        narrative = await this.generateNarrative(symbol, userId);
      }

      return res.json(narrative);
    } catch {
      return res.status(500).json({ error: 'Failed to fetch narrative' });
    }
  },

  async generateNarrative(symbol: string, userId: string) {
    const indicators = await dataIngestionService.getIndicators(symbol);
    const narrativeText = await narrativeEngine.generate({ symbol, ...indicators });
    const sentiment = narrativeEngine.extractSentiment(narrativeText);
    const confidence = narrativeEngine.extractConfidence(narrativeText);

    const narrative = AppDataSource.getRepository(Narrative).create({
      symbol,
      userId,
      text: narrativeText,
      sentiment,
      confidence,
    });

    await AppDataSource.getRepository(Narrative).save(narrative);
    return narrative;
  },

  async getNarrativeHistory(req: Request, res: Response) {
    try {
      const symbol = getParamString(req.params.symbol);
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });
      if (!symbol) return res.status(400).json({ error: 'Invalid symbol' });

      const take = getQueryNumber(req.query.limit, 20);
      const skip = getQueryNumber(req.query.offset, 0);

      const narratives = await AppDataSource.getRepository(Narrative).find({
        where: { symbol, userId },
        order: { createdAt: 'DESC' },
        take,
        skip,
      });

      return res.json(narratives);
    } catch {
      return res.status(500).json({ error: 'Failed to fetch narrative history' });
    }
  },

  async regenerateNarrative(req: Request, res: Response) {
    try {
      const symbol = getParamString(req.params.symbol);
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });
      if (!symbol) return res.status(400).json({ error: 'Invalid symbol' });

      const narrative = await this.generateNarrative(symbol, userId);
      return res.json(narrative);
    } catch {
      return res.status(500).json({ error: 'Failed to regenerate narrative' });
    }
  },
};