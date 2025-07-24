import { Request, Response } from 'express';
import { RefreshTokenUseCase } from '../../application/use-cases/refresh-token/refresh-token.use-case';
import { ResponseMapper } from '@/core/presentation/responses';
import { InMemoryRefreshTokenRepository } from '@/test/repositories/in-memory-refresh-token-repository';
import { PrismaUserRepository } from '@/modules/users/infra/repositories/prisma-user.repository';

export async function refreshTokenController(req: Request, res: Response) {
  const { refreshToken } = req.body;
  const refreshTokenRepo = InMemoryRefreshTokenRepository.getInstance();
  const userRepo = new PrismaUserRepository();
  const useCase = new RefreshTokenUseCase(refreshTokenRepo, userRepo);
  try {
    const { accessToken, refreshToken: newRefreshToken } =
      await useCase.execute({ refreshToken });
    return ResponseMapper.ok(
      res,
      { accessToken, refreshToken: newRefreshToken },
      req.requestId,
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return ResponseMapper.error(
      res,
      401,
      'Refresh token inválido',
      'UNAUTHORIZED',
      undefined,
      req.requestId,
    );
  }
}
