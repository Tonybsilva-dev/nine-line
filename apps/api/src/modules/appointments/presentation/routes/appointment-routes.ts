import { Router } from 'express';
import {
  validateCreateAppointment,
  validateUpdateAppointment,
  validateFindAppointmentById,
  validateDeleteAppointment,
  validateFindAllAppointments,
  validateFindAppointmentsByUserId,
  validateFindAppointmentsBySpaceId,
  validateApproveAppointment,
  validateRejectAppointment,
} from '../validators';
import {
  createAppointmentController,
  findAppointmentByIdController,
  findAppointmentsByUserIdController,
  findAppointmentsBySpaceIdController,
  updateAppointmentController,
  deleteAppointmentController,
  approveAppointmentController,
  rejectAppointmentController,
  findAllAppointmentsController,
} from '../controllers';
import { requireAppointmentPermission } from '@/modules/rbac/presentation/middlewares/authorization.middleware';
import { ensureAuthenticated } from '@/modules/auth/presentation/middlewares/authentication.middleware';

export const appointmentRoutes = Router();

// Create appointment - requires appointment:create permission
appointmentRoutes.post(
  '/',
  ensureAuthenticated,
  requireAppointmentPermission('create'),
  validateCreateAppointment,
  createAppointmentController,
);

// Get appointment by ID - requires appointment:read permission
appointmentRoutes.get(
  '/:id',
  ensureAuthenticated,
  requireAppointmentPermission('read'),
  validateFindAppointmentById,
  findAppointmentByIdController,
);

// Get all appointments - requires appointment:read:all permission (admin/manager only)
appointmentRoutes.get(
  '/',
  ensureAuthenticated,
  requireAppointmentPermission('read:all'),
  validateFindAllAppointments,
  findAllAppointmentsController,
);

// Get appointments by user ID - requires appointment:read:own or appointment:read:all
appointmentRoutes.get(
  '/user/:id',
  ensureAuthenticated,
  requireAppointmentPermission('read:own'),
  validateFindAppointmentsByUserId,
  findAppointmentsByUserIdController,
);

// Get appointments by space ID - requires appointment:read:all (manager/admin)
appointmentRoutes.get(
  '/space/:id',
  ensureAuthenticated,
  requireAppointmentPermission('read:all'),
  validateFindAppointmentsBySpaceId,
  findAppointmentsBySpaceIdController,
);

// Update appointment - requires appointment:update:own or appointment:update:all
appointmentRoutes.put(
  '/:id',
  ensureAuthenticated,
  requireAppointmentPermission('update:own'),
  validateFindAppointmentById,
  validateUpdateAppointment,
  updateAppointmentController,
);

// Delete appointment - requires appointment:delete:own or appointment:delete:all
appointmentRoutes.delete(
  '/:id',
  ensureAuthenticated,
  requireAppointmentPermission('delete:own'),
  validateDeleteAppointment,
  deleteAppointmentController,
);

// Approve appointment - requires appointment:approve permission (manager/admin)
appointmentRoutes.patch(
  '/:id/approve',
  ensureAuthenticated,
  requireAppointmentPermission('approve'),
  validateApproveAppointment,
  approveAppointmentController,
);

// Reject appointment - requires appointment:reject permission (manager/admin)
appointmentRoutes.patch(
  '/:id/reject',
  ensureAuthenticated,
  requireAppointmentPermission('reject'),
  validateRejectAppointment,
  rejectAppointmentController,
);
