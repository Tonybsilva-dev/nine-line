import { Request, Response } from 'express';
import { AuthorizationService } from '../../domain/services/authorization.service';
import { PrismaUserRoleRepository } from '../../infra/repositories/prisma-user-role.repository';
import { PrismaRoleRepository } from '../../infra/repositories/prisma-role.repository';
import { ResponseMapper } from '@/core/presentation/responses';

export async function getUserPermissionsController(
  req: Request,
  res: Response,
) {
  try {
    const { userId } = req.params;

    const userRoleRepository = new PrismaUserRoleRepository();
    const roleRepository = new PrismaRoleRepository();

    const authorizationService = new AuthorizationService(
      roleRepository,
      userRoleRepository,
    );

    const permissions = await authorizationService.getUserPermissions(userId);

    return ResponseMapper.ok(
      res,
      {
        userId,
        permissions: permissions,
        totalPermissions: permissions.length,
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
