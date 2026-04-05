import { Router } from 'express';
import { assetController } from '../controllers/assetController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);
router.get('/', assetController.getAssets);
router.post('/', assetController.addAsset);
router.delete('/:symbol', assetController.removeAsset);

export default router;