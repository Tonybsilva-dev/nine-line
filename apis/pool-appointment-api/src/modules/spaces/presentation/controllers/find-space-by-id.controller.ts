import { Request, Response } from 'express';
import { PrismaSpaceRepository } from '../../infra/repositories/prisma-space.repository';
import { FindSpaceByIdUseCase } from '../../application/use-cases/find-space/find-space-by-id.use-case';
import { ResponseMapper } from '@/core/presentation/responses';

export async function findSpaceByIdController(req: Request, res: Response) {
  const { id } = req.params;
  const userId = req.user?.id;
  const userRole = req.user?.role;
  const repo = new PrismaSpaceRepository();
  const useCase = new FindSpaceByIdUseCase(repo);
  const space = await useCase.execute(id);
  if (!space) {
    return ResponseMapper.error(
      res,
      404,
      'Space not found',
      'SPACE_NOT_FOUND',
      undefined,
      req.requestId,
    );
  }
  if (userRole === 'MANAGER' && space.hostId !== userId) {
    return ResponseMapper.error(
      res,
      403,
      'Managers can only view their own spaces',
      'FORBIDDEN',
      undefined,
      req.requestId,
    );
  }
  // USER and ADMIN can view any space
  const spaceData = {
    id: space.id.toString(),
    title: space.title,
    description: space.description,
    hostId: space.hostId,
    averageRating: space.averageRating,
    createdAt: space.createdAt,
    updatedAt: space.updatedAt,
  };
  return ResponseMapper.ok(res, spaceData, req.requestId);
}
