import { Request, Response } from 'express';
import { AssignRoleUseCase } from '../../application/use-cases/assign-role/assign-role.use-case';

import { ResponseMapper } from '@/core/presentation/responses';
import { PrismaRoleRepository } from '../../infra/repositories/prisma-role.repository';
import { PrismaUserRoleRepository } from '../../infra/repositories/prisma-user-role.repository';

export async function assignRoleController(req: Request, res: Response) {
  try {
    const { userId, roleId, expiresAt, assignedBy } = req.body;
    // Se não fornecido, usar o userId como assignedBy (auto-atribuição)
    const assignedByUser = assignedBy || userId;

    const userRoleRepository = new PrismaUserRoleRepository();
    const roleRepository = new PrismaRoleRepository();
    const useCase = new AssignRoleUseCase(userRoleRepository, roleRepository);

    const userRole = await useCase.execute({
      userId,
      roleId,
      assignedBy: assignedByUser,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
    });

    return ResponseMapper.created(
      res,
      {
        id: userRole.id.toString(),
        userId: userRole.userId,
        roleId: userRole.roleId,
        assignedBy: userRole.assignedBy,
        assignedAt: userRole.assignedAt,
        expiresAt: userRole.expiresAt,
      },
      req.requestId,
    );
  } catch {
    return ResponseMapper.error(
      res,
      500,
      'Internal server error',
      'INTERNAL_SERVER_ERROR',
      undefined,
      req.requestId,
    );
  }
}
