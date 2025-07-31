import { Router } from 'express';
import { userRoutes } from '@/modules/users/presentation/routes/user.routes';
import { spaceRoutes } from '@/modules/spaces/presentation/routes/space.routes';
import { ratingRoutes } from '@/modules/ratings/presentation/routes/rating-routes';
import { appointmentRoutes } from '@/modules/appointments/presentation/routes/appointment-routes';
import { rbacRoutes } from '@/modules/rbac/presentation/routes/rbac.routes';
import { authRoutes } from '@/modules/auth/presentation/routes/auth.routes';
import { healthCheck } from '../middlewares/health-check';
import { ensureAuthenticated } from '@/modules/auth/presentation/middlewares/ensure-authenticated';
import { notificationRoutes } from '@/modules/notifications/presentation/routes/notification.routes';
import { smartRateLimit } from '../middlewares/rate-limit.middleware';

export const routes = Router();

// Health check endpoint
routes.get('/health', healthCheck);

routes.use(smartRateLimit());

routes.use('/users', userRoutes);
routes.use('/spaces', ensureAuthenticated, spaceRoutes);
routes.use('/ratings', ensureAuthenticated, ratingRoutes);
routes.use('/appointments', ensureAuthenticated, appointmentRoutes);
routes.use('/rbac', ensureAuthenticated, rbacRoutes);
routes.use('/auth', authRoutes);
routes.use('/notifications', ensureAuthenticated, notificationRoutes);
