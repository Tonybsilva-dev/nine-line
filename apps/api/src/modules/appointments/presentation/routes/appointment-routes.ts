import { Router } from 'express';
import { appointmentRateLimit } from '../middlewares';
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

export const appointmentRoutes = Router();

appointmentRoutes.post(
  '/',
  validateCreateAppointment,
  appointmentRateLimit(5, 60000),
  createAppointmentController,
);
appointmentRoutes.get(
  '/:id',
  validateFindAppointmentById,
  findAppointmentByIdController,
);
appointmentRoutes.get(
  '/',
  validateFindAllAppointments,
  findAllAppointmentsController,
);
appointmentRoutes.get(
  '/user/:id',
  validateFindAppointmentsByUserId,
  findAppointmentsByUserIdController,
);
appointmentRoutes.get(
  '/space/:id',
  validateFindAppointmentsBySpaceId,
  findAppointmentsBySpaceIdController,
);
appointmentRoutes.put(
  '/:id',
  validateFindAppointmentById,
  validateUpdateAppointment,
  appointmentRateLimit(3, 60000),
  updateAppointmentController,
);
appointmentRoutes.delete(
  '/:id',
  validateDeleteAppointment,
  appointmentRateLimit(2, 60000),
  deleteAppointmentController,
);
appointmentRoutes.patch(
  '/:id/approve',
  validateApproveAppointment,
  appointmentRateLimit(3, 60000),
  approveAppointmentController,
);
appointmentRoutes.patch(
  '/:id/reject',
  validateRejectAppointment,
  appointmentRateLimit(3, 60000),
  rejectAppointmentController,
);
