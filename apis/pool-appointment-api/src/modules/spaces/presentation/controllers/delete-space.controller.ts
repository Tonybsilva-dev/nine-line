import { Request, Response } from 'express';
import { PrismaSpaceRepository } from '../../infra/repositories/prisma-space.repository';
import { DeleteSpaceUseCase } from '@/modules/spaces/application/use-cases/delete-space/delete-space.use-case';
import { ResponseMapper } from '@/core/presentation/responses';
import { eventBus } from '@/core/events';

export async function deleteSpaceController(req: Request, res: Response) {
  const { id } = req.params;
  const userId = req.user?.id;
  const userRole = req.user?.role;
  if (userRole === 'USER') {
    return ResponseMapper.error(
      res,
      403,
      'Users cannot delete spaces',
      'FORBIDDEN',
      undefined,
      req.requestId,
    );
  }
  const repo = new PrismaSpaceRepository();
  const space = await repo.findById(id);
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
      'Managers can only delete their own spaces',
      'FORBIDDEN',
      undefined,
      req.requestId,
    );
  }
  const useCase = new DeleteSpaceUseCase(repo, eventBus);
  await useCase.execute(id);
  return ResponseMapper.noContent(res, req.requestId);
}
