import { BaseError } from './base-error';

export class ErrorMapper {
  static toHTTPResponse(error: unknown): { statusCode: number; body: unknown } {
    // Erros conhecidos da aplicação
    if (error instanceof BaseError) {
      return {
        statusCode: error.statusCode,
        body: error.toJSON(),
      };
    }

    // Erros de validação Zod
    if (error instanceof Error && error.name === 'ZodError') {
      return {
        statusCode: 400,
        body: {
          success: false,
          error: {
            message: 'Validation failed',
            code: 'VALIDATION_ERROR',
            statusCode: 400,
            details:
              (
                error as {
                  flatten?: () => { fieldErrors: Record<string, string[]> };
                }
              ).flatten?.()?.fieldErrors || {},
          },
        },
      };
    }

    // Erros de Prisma
    if (
      error instanceof Error &&
      error.name === 'PrismaClientKnownRequestError'
    ) {
      return this.handlePrismaError(error as unknown as { code: string });
    }

    // Erros de autenticação JWT
    if (error instanceof Error && error.name === 'JsonWebTokenError') {
      return {
        statusCode: 401,
        body: {
          success: false,
          error: {
            message: 'Invalid token',
            code: 'INVALID_TOKEN',
            statusCode: 401,
          },
        },
      };
    }

    // Erro genérico
    return {
      statusCode: 500,
      body: {
        success: false,
        error: {
          message: 'Internal server error',
          code: 'INTERNAL_ERROR',
          statusCode: 500,
        },
      },
    };
  }

  private static handlePrismaError(error: { code: string }): {
    statusCode: number;
    body: unknown;
  } {
    switch (error.code) {
      case 'P2002': // Unique constraint violation
        return {
          statusCode: 409,
          body: {
            success: false,
            error: {
              message: 'Resource already exists',
              code: 'DUPLICATE_ENTITY',
              statusCode: 409,
            },
          },
        };

      case 'P2025': // Record not found
        return {
          statusCode: 404,
          body: {
            success: false,
            error: {
              message: 'Resource not found',
              code: 'ENTITY_NOT_FOUND',
              statusCode: 404,
            },
          },
        };

      case 'P2003': // Foreign key constraint violation
        return {
          statusCode: 400,
          body: {
            success: false,
            error: {
              message: 'Invalid reference',
              code: 'INVALID_REFERENCE',
              statusCode: 400,
            },
          },
        };

      default:
        return {
          statusCode: 500,
          body: {
            success: false,
            error: {
              message: 'Database error',
              code: 'DATABASE_ERROR',
              statusCode: 500,
            },
          },
        };
    }
  }
}
