import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user/authenticate-user-use-case';
import { PrismaUserRepository } from '../../infra/repositories/prisma-user-repository';
import { ResponseMapper } from '@/core/presentation/responses';
import jwt from 'jsonwebtoken';

export async function authenticateUserController(req: Request, res: Response) {
  const { email, password } = req.body;
  const repo = new PrismaUserRepository();
  const useCase = new AuthenticateUserUseCase(repo);
  const user = await useCase.execute({ email, password });

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });

  const responseData = {
    token,
    user: {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };

  return ResponseMapper.ok(res, responseData, req.requestId);
}
