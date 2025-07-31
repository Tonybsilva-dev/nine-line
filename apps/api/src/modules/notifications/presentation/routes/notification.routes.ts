import { Router } from 'express';
import {
  validateSendNotification,
  validateListNotifications,
  validateGetNotification,
  validateListTemplates,
} from '../validators';
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
