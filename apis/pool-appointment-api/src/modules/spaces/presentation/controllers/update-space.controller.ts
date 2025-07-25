import { Request, Response } from 'express';
import { PrismaSpaceRepository } from '../../infra/repositories/prisma-space.repository';
import { UpdateSpaceUseCase } from '@/modules/spaces/application/use-cases/update-space/update-space.use-case';
import { ResponseMapper } from '@/core/presentation/responses';
import { eventBus } from '@/core/events';

export async function updateSpaceController(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description, photos, rules } = req.body;
  const userId = req.user?.id;
  const userRole = req.user?.role;
  if (userRole === 'USER') {
    return ResponseMapper.error(
      res,
      403,
      'Users cannot update spaces',
      'FORBIDDEN',
      undefined,
      req.requestId,
    );
  }
  const repo = new PrismaSpaceRepository();
  const useCase = new UpdateSpaceUseCase(repo, eventBus);
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
      'Managers can only update their own spaces',
      'FORBIDDEN',
      undefined,
      req.requestId,
    );
  }
  await useCase.execute({
    id,
    title,
    description,
    photos,
    rules,
  });
  return ResponseMapper.ok(
    res,
    { message: 'Space updated successfully' },
    req.requestId,
  );
}
