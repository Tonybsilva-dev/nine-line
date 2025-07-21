import { Request, Response } from 'express';
import { PrismaSpaceRepository } from '../../infra/repositories/prisma-space-repository';
import { FindSpaceByIdUseCase } from '../../application/use-cases/find-space/find-space-by-id.use-case';
import { ResponseMapper } from '@/core/presentation/responses';

export async function findSpaceByIdController(req: Request, res: Response) {
  const { id } = req.params;

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
