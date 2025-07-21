import { Request, Response } from 'express';
import { PrismaSpaceRepository } from '../../infra/repositories/prisma-space-repository';
import { FindAllSpacesUseCase } from '../../application/use-cases/find-space/find-all-spaces.use-case';
import { ResponseMapper } from '@/core/presentation/responses';

export async function findAllSpacesController(req: Request, res: Response) {
  const pagination = req.pagination;
  const repo = new PrismaSpaceRepository();
  const useCase = new FindAllSpacesUseCase(repo);

  const { total, spaces } = await useCase.execute(pagination ?? {});

  const spacesData = spaces.map((space) => ({
    id: space.id.toString(),
    title: space.title,
    description: space.description,
    hostId: space.hostId,
    averageRating: space.averageRating,
    createdAt: space.createdAt,
  }));

  return ResponseMapper.paginated(
    res,
    spacesData,
    pagination ?? {},
    total,
    req.requestId,
  );
}
