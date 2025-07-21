import { Request, Response } from 'express';
import { PrismaUserRepository } from '../../infra/repositories/prisma-user-repository';
import { UpdateUserUseCase } from '../../application/use-cases/update-user/update-user.use-case';
import { ResponseMapper } from '@/core/presentation/responses';
import { eventBus } from '@/core/events';

export async function updateUserController(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;

  const repo = new PrismaUserRepository();
  const useCase = new UpdateUserUseCase(repo, eventBus);

  await useCase.execute({ id, ...data });

  return ResponseMapper.ok(
    res,
    { message: 'User updated successfully' },
    req.requestId,
  );
}
