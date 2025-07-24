import { Request, Response } from 'express';
import { PrismaAppointmentRepository } from '../../infra/repositories';
import { DeleteAppointmentUseCase } from '../../application/use-cases/delete-appointment/delete-appointment.use-case';
import { ResponseMapper } from '@/core/presentation/responses';
import { eventBus } from '@/core/events';
import { prisma } from '@/config/prisma';

export async function deleteAppointmentController(req: Request, res: Response) {
  const { id } = req.params;

  const appointmentRepo = new PrismaAppointmentRepository(prisma);
  const useCase = new DeleteAppointmentUseCase(appointmentRepo, eventBus);

  await useCase.execute(id);

  return ResponseMapper.noContent(res, req.requestId);
}
