import { Request, Response } from 'express';
import { AuthenticateUseCase } from '../../application/use-cases/authenticate/authenticate.use-case';

import { ResponseMapper } from '@/core/presentation/responses';
import { PrismaUserRepository } from '@/modules/users/infra/repositories/prisma-user.repository';
import { InMemoryRefreshTokenRepository } from '@/test/repositories/in-memory-refresh-token-repository';

export async function authenticateController(req: Request, res: Response) {
  const { email, password } = req.body;
  const userRepo = new PrismaUserRepository();
  const refreshTokenRepo = InMemoryRefreshTokenRepository.getInstance();
  const useCase = new AuthenticateUseCase(userRepo, refreshTokenRepo);
  try {
    const { accessToken, refreshToken, user } = await useCase.execute({
      email,
      password,
    });
    return ResponseMapper.ok(
      res,
      {
        accessToken,
        refreshToken,
        user: {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      req.requestId,
    );
  } catch {
    return ResponseMapper.error(
      res,
      401,
      'Invalid credentials',
      'UNAUTHORIZED',
      undefined,
      req.requestId,
    );
  }
}
