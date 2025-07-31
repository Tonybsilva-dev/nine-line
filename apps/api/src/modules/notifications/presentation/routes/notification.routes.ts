import { Router } from 'express';
import {
  validateSendNotification,
  validateListNotifications,
  validateGetNotification,
  validateListTemplates,
} from '../validators';
import { notificationRateLimit } from '../middlewares';
import { requirePermission } from '@/modules/rbac/presentation/middleware/authorization.middleware';
import {
  sendNotificationController,
  listNotificationsController,
  listTemplatesController,
  getNotificationController,
} from '../controllers';

export const notificationRoutes = Router();

notificationRoutes.post(
  '/send',
  validateSendNotification,
  notificationRateLimit(5, 60000), // 5 requests por minuto
  requirePermission('notifications:send'),
  sendNotificationController,
);

notificationRoutes.get(
  '/',
  validateListNotifications,
  requirePermission('notifications:read'),
  listNotificationsController,
);

notificationRoutes.get(
  '/:id',
  validateGetNotification,
  requirePermission('notifications:read'),
  getNotificationController,
);

notificationRoutes.get(
  '/templates',
  validateListTemplates,
  requirePermission('notifications:templates:read'),
  listTemplatesController,
);
