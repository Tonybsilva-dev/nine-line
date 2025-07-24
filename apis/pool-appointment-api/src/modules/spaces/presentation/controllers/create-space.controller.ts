import { Request, Response } from 'express';
import { CreateSpaceUseCase } from '@/modules/spaces/application/use-cases/create-space/create-space.use-case';
import { PrismaSpaceRepository } from '../../infra/repositories/prisma-space.repository';
import { ResponseMapper } from '@/core/presentation/responses';
import { eventBus } from '@/core/events';

export async function createSpaceController(req: Request, res: Response) {
  const { title, description, photos, rules, hostId } = req.body;
  const repo = new PrismaSpaceRepository();
  const useCase = new CreateSpaceUseCase(repo, eventBus);

  const { space } = await useCase.execute({
    title,
    description,
    photos,
    rules,
    hostId,
  });

  const spaceData = {
    id: space.id.toString(),
    title: space.title,
    description: space.description,
    hostId: space.hostId,
    averageRating: space.averageRating,
    createdAt: space.createdAt,
  };

  return ResponseMapper.created(res, spaceData, req.requestId);
}
