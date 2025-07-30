import { Request, Response } from 'express';
import { PrismaAppointmentRepository } from '../../infra/repositories';
import { FindAllAppointmentsUseCase } from '../../application/use-cases/find-appointment/find-all-appointments.use-case';
import { FindAppointmentsByUserIdUseCase } from '../../application/use-cases/find-appointment/find-appointments-by-user-id.use-case';
import { prisma } from '@/config/prisma';

export async function findAllAppointmentsController(
  req: Request,
  res: Response,
) {
  const pagination = req.pagination ?? {};
  const userId = req.user?.id;
  const userRole = req.user?.role;
  if (!userId || !userRole) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  const appointmentRepo = new PrismaAppointmentRepository(prisma);
  if (userRole === 'USER') {
    const useCase = new FindAppointmentsByUserIdUseCase(appointmentRepo);
    const result = await useCase.execute(userId, pagination);
    return res.status(200).json(result);
  }
  const useCase = new FindAllAppointmentsUseCase(appointmentRepo);
  type FindAllAppointmentsParams = Parameters<typeof useCase.execute>[0];
  const params: FindAllAppointmentsParams = { ...pagination };
  if (userRole === 'MANAGER') {
    params.hostId = userId;
    params.userRole = userRole;
  }
  if (userRole === 'ADMIN') {
    params.userRole = userRole;
  }
  const result = await useCase.execute(params);
  return res.status(200).json(result);
}
