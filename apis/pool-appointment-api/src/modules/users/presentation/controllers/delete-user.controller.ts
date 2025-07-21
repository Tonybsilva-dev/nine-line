import { Request, Response } from 'express';
import { PrismaUserRepository } from '../../infra/repositories/prisma-user-repository';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user/delete-user.use-case';
import { ResponseMapper } from '@/core/presentation/responses';
import { eventBus } from '@/core/events';

export async function deleteUserController(req: Request, res: Response) {
  const { id } = req.params;
  const repo = new PrismaUserRepository();
  const useCase = new DeleteUserUseCase(repo, eventBus);

  await useCase.execute(id);

  return ResponseMapper.noContent(res, req.requestId);
}
