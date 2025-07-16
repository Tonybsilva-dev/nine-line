import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export function ensureAuthenticated(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token missing' });

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req.user = { id: (decoded as any).sub };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
