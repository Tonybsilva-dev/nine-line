import { Request, Response } from 'express';
import { PrismaSpaceRepository } from '../../infra/repositories/prisma-space.repository';
import { DeleteSpaceUseCase } from '@/modules/spaces/application/use-cases/delete-space/delete-space.use-case';
import { ResponseMapper } from '@/core/presentation/responses';
import { eventBus } from '@/core/events';

export async function deleteSpaceController(req: Request, res: Response) {
  const { id } = req.params;

  const repo = new PrismaSpaceRepository();
  const useCase = new DeleteSpaceUseCase(repo, eventBus);

  await useCase.execute(id);

  return ResponseMapper.noContent(res, req.requestId);
}
