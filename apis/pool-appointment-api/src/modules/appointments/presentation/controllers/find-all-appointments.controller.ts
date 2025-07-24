import { Request, Response } from 'express';
import { PrismaAppointmentRepository } from '../../infra/repositories';
import { FindAllAppointmentsUseCase } from '../../application/use-cases/find-appointment/find-all-appointments.use-case';
import { prisma } from '@/config/prisma';

export async function findAllAppointmentsController(
  req: Request,
  res: Response,
) {
  const pagination = req.pagination ?? {};
  const appointmentRepo = new PrismaAppointmentRepository(prisma);
  const useCase = new FindAllAppointmentsUseCase(appointmentRepo);
  const result = await useCase.execute(pagination);
  return res.status(200).json(result);
}
