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

export const appointmentRoutes = Router();

appointmentRoutes.post(
  '/',
  validateCreateAppointment,
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
  updateAppointmentController,
);
appointmentRoutes.delete(
  '/:id',
  validateDeleteAppointment,
  deleteAppointmentController,
);
appointmentRoutes.patch(
  '/:id/approve',
  validateApproveAppointment,
  approveAppointmentController,
);
appointmentRoutes.patch(
  '/:id/reject',
  validateRejectAppointment,
  rejectAppointmentController,
);
