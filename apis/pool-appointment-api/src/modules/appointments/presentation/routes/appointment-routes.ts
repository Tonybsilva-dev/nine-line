import { Router } from 'express';
import {
  validateCreateAppointment,
  validateUpdateAppointment,
} from '../validators';
import { validatePagination, validateParamsId } from '@/core/validators';
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
appointmentRoutes.get('/:id', validateParamsId, findAppointmentByIdController);
appointmentRoutes.get('/', findAllAppointmentsController);
appointmentRoutes.get(
  '/user/:id',
  validateParamsId,
  validatePagination,
  findAppointmentsByUserIdController,
);
appointmentRoutes.get(
  '/space/:id',
  validateParamsId,
  validatePagination,
  findAppointmentsBySpaceIdController,
);
appointmentRoutes.put(
  '/:id',
  validateParamsId,
  validateUpdateAppointment,
  updateAppointmentController,
);
appointmentRoutes.delete('/:id', validateParamsId, deleteAppointmentController);
appointmentRoutes.patch(
  '/:id/approve',
  validateParamsId,
  approveAppointmentController,
);
appointmentRoutes.patch(
  '/:id/reject',
  validateParamsId,
  rejectAppointmentController,
);
