import { Router } from 'express';
import { userRoutes } from '@/modules/users/presentation/routes/user.routes';
import { spaceRoutes } from '@/modules/spaces/presentation/routes/space.routes';
import { appointmentRoutes } from '@/modules/appointments/presentation/routes/appointment-routes';
import { authRoutes } from '@/modules/auth/presentation/routes/auth.routes';
import { rbacRoutes } from '@/modules/rbac/presentation/routes/rbac.routes';
import { notificationRoutes } from '@/modules/notifications/presentation/routes/notification.routes';
import { ratingRoutes } from '@/modules/ratings/presentation/routes/rating-routes';
import { healthCheck } from '../middlewares/health-check.middleware';
import { smartRateLimit } from '../middlewares/rate-limit.middleware';

export const routes = Router();

routes.get('/health', healthCheck);
routes.use(smartRateLimit());

routes.use('/users', userRoutes);
routes.use('/spaces', spaceRoutes);
routes.use('/appointments', appointmentRoutes);
routes.use('/auth', authRoutes);
routes.use('/rbac', rbacRoutes);
routes.use('/notifications', notificationRoutes);
routes.use('/ratings', ratingRoutes);
