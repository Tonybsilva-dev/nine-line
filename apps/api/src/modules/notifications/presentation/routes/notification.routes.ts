import { Router } from 'express';
import { validateSendNotification } from '../validators';
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
  requirePermission('notifications:send'),
  sendNotificationController,
);

notificationRoutes.get(
  '/',
  requirePermission('notifications:read'),
  listNotificationsController,
);

notificationRoutes.get(
  '/:id',
  requirePermission('notifications:read'),
  getNotificationController,
);

notificationRoutes.get(
  '/templates',
  requirePermission('notifications:templates:read'),
  listTemplatesController,
);
