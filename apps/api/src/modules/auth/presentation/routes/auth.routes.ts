import { Router } from 'express';
import {
  validateLogin,
  validateRefreshToken,
  validateLogout,
} from '../validators';
import { authenticateController } from '../controllers/authenticate.controller';
import { refreshTokenController } from '../controllers/refresh-token.controller';
import { logoutController } from '../controllers/logout.controller';

const router = Router();

router.post('/login', validateLogin, authenticateController);
router.post('/refresh', validateRefreshToken, refreshTokenController);
router.post('/logout', validateLogout, logoutController);

export { router as authRoutes };
