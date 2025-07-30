import { Request, Response } from 'express';
import { PrismaAppointmentRepository } from '../../infra/repositories';
import { UpdateAppointmentUseCase } from '../../application/use-cases/update-appointment/update-appointment.use-case';
import { ResponseMapper } from '@/core/presentation/responses';
import { eventBus } from '@/core/events';
import { prisma } from '@/config/prisma';

export async function updateAppointmentController(req: Request, res: Response) {
  const { id } = req.params;
  const { date, startTime, endTime, status, cancelReason } = req.body;
  const userId = req.user?.id;
  const userRole = req.user?.role;

  if (!userId || !userRole) {
    return ResponseMapper.error(
      res,
      401,
      'Authentication required',
      'UNAUTHORIZED',
      undefined,
      req.requestId,
    );
  }

  const appointmentRepo = new PrismaAppointmentRepository(prisma);
  const useCase = new UpdateAppointmentUseCase(appointmentRepo, eventBus);

  const appointment = await useCase.execute({
    id,
    date: date ? new Date(date) : undefined,
    startTime: startTime ? new Date(startTime) : undefined,
    endTime: endTime ? new Date(endTime) : undefined,
    status,
    cancelReason,
    userId,
    userRole,
  });

  const appointmentData = {
    id: appointment.id.toString(),
    userId: appointment.userId,
    spaceId: appointment.spaceId,
    date: appointment.date,
    startTime: appointment.startTime,
    endTime: appointment.endTime,
    status: appointment.status,
    updatedAt: appointment.updatedAt,
  };

  return ResponseMapper.ok(res, appointmentData, req.requestId);
}
