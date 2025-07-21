import { Request, Response } from 'express';
import { PrismaUserRepository } from '../../infra/repositories/prisma-user-repository';
import { CreateUserUseCase } from '../../application/use-cases/create-user/create-user.use-case';
import { ResponseMapper } from '@/core/presentation/responses';
import { eventBus } from '@/core/events';

export async function createUserController(req: Request, res: Response) {
  const { name, email, password, status, role } = req.body;
  const repo = new PrismaUserRepository();
  const useCase = new CreateUserUseCase(repo, eventBus);

  const user = await useCase.execute({ name, email, password, status, role });

  const userData = {
    id: user.id.toString(),
    name: user.name,
    email: user.email,
    status: user.status,
    role: user.role,
  };

  return ResponseMapper.created(res, userData, req.requestId);
}
