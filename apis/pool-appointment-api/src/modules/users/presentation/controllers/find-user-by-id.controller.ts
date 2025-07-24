import { Request, Response } from 'express';
import { PrismaUserRepository } from '../../infra/repositories';
import { FindUserByIdUseCase } from '../../application/use-cases/find-user/find-user-by-id.use-case';
import { ResponseMapper } from '@/core/presentation/responses';

export async function findUserByIdController(req: Request, res: Response) {
  const { id } = req.params;
  const repo = new PrismaUserRepository();
  const useCase = new FindUserByIdUseCase(repo);

  const user = await useCase.execute(id);

  if (!user) {
    return ResponseMapper.error(
      res,
      404,
      'User not found',
      'USER_NOT_FOUND',
      undefined,
      req.requestId,
    );
  }

  const userData = {
    id: user.id.toString(),
    name: user.name,
    email: user.email,
    status: user.status,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return ResponseMapper.ok(res, userData, req.requestId);
}
