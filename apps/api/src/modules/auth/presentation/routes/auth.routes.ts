import { Router } from 'express';
import { authRateLimit } from '../middlewares';
import {
  validateLogin,
  validateRefreshToken,
  validateLogout,
} from '../validators';
import { authenticateController } from '../controllers/authenticate.controller';
import { refreshTokenController } from '../controllers/refresh-token.controller';
import { logoutController } from '../controllers/logout.controller';

const router = Router();

router.post(
  '/login',
  validateLogin,
  authRateLimit(3, 300000),
  authenticateController,
);
router.post(
  '/refresh',
  validateRefreshToken,
  authRateLimit(5, 300000),
  refreshTokenController,
);
router.post('/logout', validateLogout, logoutController);

export { router as authRoutes };
