import { Request, Response } from 'express';
import { LogoutUseCase } from '../../application/use-cases/logout/logout.use-case';
import { ResponseMapper } from '@/core/presentation/responses';
import { InMemoryTokenBlacklistRepository } from '@/test/repositories/in-memory-token-blacklist-repository';

export async function logoutController(req: Request, res: Response) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return ResponseMapper.error(
      res,
      400,
      'Token not provided',
      'BAD_REQUEST',
      undefined,
      req.requestId,
    );
  }
  const blacklistRepo = new InMemoryTokenBlacklistRepository();
  const useCase = new LogoutUseCase(blacklistRepo);
  await useCase.execute({ token });
  return ResponseMapper.ok(
    res,
    { message: 'Logout performed successfully' },
    req.requestId,
  );
}
