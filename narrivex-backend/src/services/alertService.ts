import { AppDataSource } from '../config/database';
import { Alert } from '../entities/Alert';
import { User } from '../entities/User';
import { dataIngestionService } from './dataIngestionService';
import { notificationService } from './notificationService';

function shouldTrigger(ruleType: string, threshold: number, price: number): boolean {
  if (ruleType === 'price_below') return price <= threshold;
  if (ruleType === 'price_above') return price >= threshold;
  if (ruleType === 'price_change') return Math.abs(price) >= threshold;
  return false;
}

export const alertService = {
  async evaluateRulesForUser(userId: string) {
    const repo = AppDataSource.getRepository(Alert);
    const rules = await repo.find({ where: { userId, enabled: true } });

    const triggered: Alert[] = [];

    for (const rule of rules) {
      const candle = await dataIngestionService.getLatestCandle(rule.symbol);
      const isTriggered = shouldTrigger(rule.ruleType, Number(rule.threshold), candle.close);

      if (!isTriggered) continue;

      if (rule.lastTriggeredAt && Date.now() - rule.lastTriggeredAt.getTime() < 60 * 1000) {
        continue;
      }

      rule.lastTriggeredAt = new Date();
      await repo.save(rule);
      triggered.push(rule);
    }

    return triggered;
  },

  async evaluateAndDispatch() {
    const alertRepo = AppDataSource.getRepository(Alert);
    const userRepo = AppDataSource.getRepository(User);

    const activeRules = await alertRepo.find({ where: { enabled: true } });
    const uniqueUserIds = [...new Set(activeRules.map((rule) => rule.userId))];

    for (const userId of uniqueUserIds) {
      const user = await userRepo.findOne({ where: { id: userId } });
      if (!user) continue;

      const triggered = await this.evaluateRulesForUser(userId);
      for (const rule of triggered) {
        const message = `Alert triggered for ${rule.symbol}: ${rule.ruleType} threshold ${rule.threshold}`;
        await notificationService.notify(user, rule.channel, message);
      }
    }
  },
};