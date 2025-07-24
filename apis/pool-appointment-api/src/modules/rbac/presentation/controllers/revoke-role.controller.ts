import { Request, Response } from 'express';
import { RevokeRoleUseCase } from '../../application/use-cases/revoke-role/revoke-role.use-case';
import { PrismaUserRoleRepository } from '../../infra/repositories/prisma-user-role.repository';
import { PrismaRoleRepository } from '../../infra/repositories/prisma-role.repository';
import { ResponseMapper } from '@/core/presentation/responses';

export async function revokeRoleController(req: Request, res: Response) {
  try {
    const { userId, roleId } = req.body;
    const revokedBy = req.user?.id || 'system';

    const userRoleRepository = new PrismaUserRoleRepository();
    const roleRepository = new PrismaRoleRepository();
    const useCase = new RevokeRoleUseCase(userRoleRepository, roleRepository);

    await useCase.execute({
      userId,
      roleId,
      revokedBy,
    });

    return ResponseMapper.ok(
      res,
      {
        message: 'Role revoked successfully',
        userId,
        roleId,
        revokedBy,
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
