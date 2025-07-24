/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { InMemoryTokenBlacklistRepository } from '@/test/repositories/in-memory-token-blacklist-repository';

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token missing' });

  const [, token] = authHeader.split(' ');

  // Verifica blacklist
  const blacklistRepo = new InMemoryTokenBlacklistRepository();
  if (await blacklistRepo.has(token)) {
    return res.status(401).json({ error: 'Token inválido (logout realizado)' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = {
      id: (decoded as any).sub,
      name: (decoded as any).name || '',
      email: (decoded as any).email || '',
      role: (decoded as any).role || '',
    };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
