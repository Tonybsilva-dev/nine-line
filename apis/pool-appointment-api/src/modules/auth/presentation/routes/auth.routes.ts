import { Router } from 'express';
import { authenticateController } from '../controllers/authenticate.controller';
import { refreshTokenController } from '../controllers/refresh-token.controller';
import { logoutController } from '../controllers/logout.controller';

const router = Router();

router.post('/login', authenticateController);
router.post('/refresh', refreshTokenController);
router.post('/logout', logoutController);

export { router as authRoutes };
