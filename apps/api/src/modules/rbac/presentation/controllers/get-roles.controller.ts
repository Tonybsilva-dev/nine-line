import { Request, Response } from 'express';
import { ResponseMapper } from '@/core/presentation/responses';
import { PrismaRoleRepository } from '../../infra/repositories/prisma-role.repository';

export async function getRolesController(req: Request, res: Response) {
  try {
    const { page = 1, perPage = 10 } = req.query;

    const roleRepository = new PrismaRoleRepository();
    const result = await roleRepository.findAll({
      page: Number(page),
      perPage: Number(perPage),
    });

    return ResponseMapper.ok(
      res,
      {
        roles: result.roles.map((role) => ({
          id: role.id.toString(),
          name: role.name,
          description: role.description,
          level: role.level,
          isSystem: role.isSystem,
          createdAt: role.createdAt,
          updatedAt: role.updatedAt,
        })),
        pagination: {
          page: Number(page),
          perPage: Number(perPage),
          total: result.total,
          totalPages: Math.ceil(result.total / Number(perPage)),
        },
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
