import { Request, Response, NextFunction } from 'express';
import { AuthorizationService } from '../../domain/services/authorization.service';
import { PrismaRoleRepository } from '../../infra/repositories/prisma-role.repository';
import { PrismaUserRoleRepository } from '../../infra/repositories/prisma-user-role.repository';
import { UnauthorizedError } from '@/core/errors';
import { logger } from '@/config/logger';

interface AuthorizationOptions {
  permission?: string;
  resource?: string;
  action?: string;
  roleLevel?: number;
  requireAuth?: boolean;
}

export function requirePermission(options: AuthorizationOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        if (options.requireAuth !== false) {
          throw new UnauthorizedError('Authentication required');
        }
        return next();
      }

      const authService = new AuthorizationService(
        new PrismaRoleRepository(),
        new PrismaUserRoleRepository(),
      );

      // Check role level if specified
      if (options.roleLevel !== undefined) {
        await authService.requireRoleLevel(userId, options.roleLevel);
      }

      // Check specific permission if provided
      if (options.permission) {
        await authService.requirePermission(userId, options.permission);
      }

      // Check resource:action permission if provided
      if (options.resource && options.action) {
        const hasAccess = await authService.canAccessResource(
          userId,
          options.resource,
          options.action,
        );

        if (!hasAccess) {
          throw new UnauthorizedError(
            `Access denied to ${options.resource}:${options.action}`,
          );
        }
      }

      logger.info({
        type: 'authorization_success',
        userId,
        permission: options.permission,
        resource: options.resource,
        action: options.action,
        roleLevel: options.roleLevel,
        method: req.method,
        url: req.url,
      });

      next();
    } catch (error) {
      logger.error({
        type: 'authorization_failed',
        userId: req.user?.id,
        error: error instanceof Error ? error.message : 'Unknown error',
        method: req.method,
        url: req.url,
        permission: options.permission,
        resource: options.resource,
        action: options.action,
        roleLevel: options.roleLevel,
      });

      if (error instanceof UnauthorizedError) {
        return res.status(403).json({
          success: false,
          error: {
            message: error.message,
            code: 'UNAUTHORIZED',
            statusCode: 403,
          },
        });
      }

      return res.status(500).json({
        success: false,
        error: {
          message: 'Internal server error during authorization',
          code: 'AUTHORIZATION_ERROR',
          statusCode: 500,
        },
      });
    }
  };
}

// Convenience functions for common authorization patterns
export const requireUserRole = () => requirePermission({ roleLevel: 0 });
export const requireManagerRole = () => requirePermission({ roleLevel: 1 });
export const requireAdminRole = () => requirePermission({ roleLevel: 2 });

export const requireAppointmentPermission = (action: string) =>
  requirePermission({ resource: 'appointment', action });

export const requireUserPermission = (action: string) =>
  requirePermission({ resource: 'user', action });

export const requireSpacePermission = (action: string) =>
  requirePermission({ resource: 'space', action });

export const requireRatingPermission = (action: string) =>
  requirePermission({ resource: 'rating', action });

export const requireRBACPermission = (action: string) =>
  requirePermission({ resource: 'rbac', action });
