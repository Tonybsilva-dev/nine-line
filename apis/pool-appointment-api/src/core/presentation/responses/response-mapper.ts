import { Response } from 'express';
import { SuccessResponse } from './success-response';
import { PaginationResponse } from './pagination-response';
import { ResponseBase } from './response-base';
import { PaginationParams } from '@/core/repositories/pagination-params';

export class ResponseMapper {
  /**
   * Envia resposta de sucesso com status 200
   */
  static ok<T>(res: Response, data: T, requestId?: string): Response {
    const response = SuccessResponse.ok(data, requestId);
    return res.status(200).json(response.toJSON());
  }

  /**
   * Envia resposta de criação com status 201
   */
  static created<T>(res: Response, data: T, requestId?: string): Response {
    const response = SuccessResponse.created(data, requestId);
    return res.status(201).json(response.toJSON());
  }

  /**
   * Envia resposta sem conteúdo com status 204
   */
  static noContent(res: Response, requestId?: string): Response {
    const response = SuccessResponse.noContent(requestId);
    return res.status(204).json(response.toJSON());
  }

  /**
   * Envia resposta com paginação
   */
  static paginated<T>(
    res: Response,
    items: T[],
    paginationParams: PaginationParams,
    total: number,
    requestId?: string,
  ): Response {
    const response = PaginationResponse.create(
      items,
      paginationParams,
      total,
      requestId,
    );
    return res.status(200).json(response.toJSON());
  }

  /**
   * Envia resposta customizada
   */
  static custom<T>(
    res: Response,
    statusCode: number,
    response: ResponseBase<T>,
  ): Response {
    return res.status(statusCode).json(response.toJSON());
  }

  /**
   * Envia resposta de erro
   */
  static error(
    res: Response,
    statusCode: number,
    message: string,
    code: string,
    details?: Record<string, unknown>,
    requestId?: string,
  ): Response {
    const response = {
      success: false,
      error: {
        message,
        code,
        statusCode,
        details,
      },
      metadata: ResponseBase.createMetadata(requestId),
    };

    return res.status(statusCode).json(response);
  }
}
