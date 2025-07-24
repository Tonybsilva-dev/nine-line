import { Request, Response } from 'express';
import { PrismaAppointmentRepository } from '../../infra/repositories';
import { PrismaSpaceRepository } from '@/modules/spaces/infra/repositories/prisma-space.repository';
import { PrismaUserRepository } from '@/modules/users/infra/repositories';
import { CreateAppointmentUseCase } from '../../application/use-cases/create-appointment/create-appointment.use-case';
import { ResponseMapper } from '@/core/presentation/responses';
import { eventBus } from '@/core/events';
import { prisma } from '@/config/prisma';

export async function createAppointmentController(req: Request, res: Response) {
  const { userId, spaceId, date, startTime, endTime } = req.body;

  const appointmentRepo = new PrismaAppointmentRepository(prisma);
  const spaceRepo = new PrismaSpaceRepository();
  const userRepo = new PrismaUserRepository();
  const useCase = new CreateAppointmentUseCase(
    appointmentRepo,
    spaceRepo,
    userRepo,
    eventBus,
  );

  const appointment = await useCase.execute({
    userId,
    spaceId,
    date: new Date(date),
    startTime: new Date(startTime),
    endTime: new Date(endTime),
  });

  const appointmentData = {
    id: appointment.id.toString(),
    userId: appointment.userId,
    spaceId: appointment.spaceId,
    date: appointment.date,
    startTime: appointment.startTime,
    endTime: appointment.endTime,
    status: appointment.status,
    createdAt: appointment.createdAt,
  };

  return ResponseMapper.created(res, appointmentData, req.requestId);
}
