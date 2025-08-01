import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV_CONFIG } from '@/config/env';
import { UnauthorizedError } from '@/core/errors';
import { logger } from '@/config/logger';
import { prisma } from '@/config/prisma';
import { getCache, setCache, deleteCache } from '@/config/redis.config';

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

interface CachedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const CACHE_TTL = 5 * 60; // 5 minutos
const CACHE_PREFIX = 'auth:user:';

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    throw new UnauthorizedError('Access token required');
  }

  try {
    const decoded = jwt.verify(token, ENV_CONFIG.JWT_SECRET) as JWTPayload;
    const userId = decoded.userId;

    const cacheKey = `${CACHE_PREFIX}${userId}`;
    const cachedUser = await getCache<CachedUser>(cacheKey);

    if (cachedUser) {
      if (cachedUser.status !== 'ACTIVE') {
        await deleteCache(cacheKey);
        throw new UnauthorizedError('User is not active');
      }

      req.user = {
        id: cachedUser.id,
        name: cachedUser.name,
        email: cachedUser.email,
        role: cachedUser.role,
      };

      logger.info({
        type: 'authentication_success_cached',
        userId: cachedUser.id,
        userEmail: cachedUser.email,
        method: req.method,
        url: req.url,
      });

      return next();
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        status: 'ACTIVE',
        deletedAt: null,
      },
    });

    if (!user) {
      throw new UnauthorizedError('User not found or inactive');
    }

    const userToCache: CachedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    };

    await setCache(cacheKey, userToCache, CACHE_TTL);

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    logger.info({
      type: 'authentication_success_db',
      userId: user.id,
      userEmail: user.email,
      method: req.method,
      url: req.url,
    });

    next();
  } catch (error) {
    logger.error({
      type: 'authentication_failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      method: req.method,
      url: req.url,
    });

    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError('Invalid token');
    }

    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError('Token expired');
    }

    if (error instanceof UnauthorizedError) {
      throw error;
    }

    throw new UnauthorizedError('Authentication failed');
  }
}

export async function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, ENV_CONFIG.JWT_SECRET) as JWTPayload;
    const userId = decoded.userId;

    const cacheKey = `${CACHE_PREFIX}${userId}`;
    const cachedUser = await getCache<CachedUser>(cacheKey);

    if (cachedUser && cachedUser.status === 'ACTIVE') {
      req.user = {
        id: cachedUser.id,
        name: cachedUser.name,
        email: cachedUser.email,
        role: cachedUser.role,
      };
      return next();
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        status: 'ACTIVE',
        deletedAt: null,
      },
    });

    if (user) {
      const userToCache: CachedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      };

      await setCache(cacheKey, userToCache, CACHE_TTL);

      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }

    next();
  } catch {
    next();
  }
}

export async function invalidateUserCache(userId: string): Promise<void> {
  const cacheKey = `${CACHE_PREFIX}${userId}`;
  await deleteCache(cacheKey);

  logger.info({
    type: 'user_cache_invalidated',
    userId,
  });
}
