import { Request, Response } from 'express';
import { PrismaUserRepository } from '../../infra/repositories';
import { FindAllUsersUseCase } from '../../application/use-cases/find-user/find-all-users.use-case';
import { ResponseMapper } from '@/core/presentation/responses';

export async function findAllUsersController(req: Request, res: Response) {
  const pagination = req.pagination ?? {};
  const repo = new PrismaUserRepository();
  const useCase = new FindAllUsersUseCase(repo);

  const { total, users } = await useCase.execute(pagination);

  const usersData = users.map((user) => ({
    id: user.id.toString(),
    name: user.name,
    email: user.email,
    status: user.status,
    role: user.role,
    createdAt: user.createdAt,
  }));

  return ResponseMapper.paginated(
    res,
    usersData,
    pagination,
    total,
    req.requestId,
  );
}
