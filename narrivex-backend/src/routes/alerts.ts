import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { alertController } from '../controllers/alertController';

const router = Router();

router.use(authMiddleware);

router.get('/rules', alertController.getRules);
router.post('/rules', alertController.createRule);
router.put('/rules/:id', alertController.updateRule);
router.delete('/rules/:id', alertController.deleteRule);

export default router;