import { InMemoryTokenBlacklistRepository } from '@/test/repositories/in-memory-token-blacklist-repository';
import { Request, Response, NextFunction } from 'express';

export async function checkBlacklist(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token not provided' });
  const blacklistRepo = new InMemoryTokenBlacklistRepository();
  const isBlacklisted = await blacklistRepo.has(token);
  if (isBlacklisted) {
    return res.status(401).json({ error: 'Invalid token (logout performed)' });
  }
  next();
}
