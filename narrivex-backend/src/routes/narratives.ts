import { Router } from 'express';
import { narrativeController } from '../controllers/narrativeController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);
router.get('/:symbol', narrativeController.getNarrative);
router.get('/:symbol/history', narrativeController.getNarrativeHistory);
router.post('/:symbol/regenerate', narrativeController.regenerateNarrative);

export default router;