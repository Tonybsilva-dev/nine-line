import { Request, Response } from 'express';
import { RejectAppointmentUseCase } from '../../application/use-cases/reject-appointment/reject-appointment.use-case';
import { PrismaAppointmentRepository } from '../../infra/repositories/prisma-appointment.repository';
import { AuthorizationService } from '@/modules/rbac/domain/services/authorization.service';
import { PrismaRoleRepository } from '@/modules/rbac/infra/repositories/prisma-role.repository';
import { PrismaUserRoleRepository } from '@/modules/rbac/infra/repositories/prisma-user-role.repository';
import { ResponseMapper } from '@/core/presentation/responses';
import { prisma } from '@/config/prisma';

export async function rejectAppointmentController(req: Request, res: Response) {
  const { id } = req.params;
  const adminId = req.user?.id;

  if (!adminId) {
    return ResponseMapper.error(
      res,
      401,
      'Authentication required',
      'UNAUTHORIZED',
      undefined,
      req.requestId,
    );
  }

  const appointmentRepository = new PrismaAppointmentRepository(prisma);
  const roleRepository = new PrismaRoleRepository();
  const userRoleRepository = new PrismaUserRoleRepository();
  const authorizationService = new AuthorizationService(
    roleRepository,
    userRoleRepository,
  );
  const useCase = new RejectAppointmentUseCase(
    appointmentRepository,
    authorizationService,
  );

  const appointment = await useCase.execute({
    appointmentId: id,
    adminId,
    rejectedBy: adminId,
  });

  return ResponseMapper.ok(
    res,
    {
      id: appointment.id.toString(),
      userId: appointment.userId,
      spaceId: appointment.spaceId,
      date: appointment.date,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      status: appointment.status,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
    },
    req.requestId,
  );
}
