import { ResponseBase, ResponseMetadata } from './response-base';
import { PaginationParams } from '@/core/repositories/pagination-params';

export interface PaginationData<T = unknown> {
  items: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  };
}

export class PaginationResponse<T = unknown> extends ResponseBase<
  PaginationData<T>
> {
  constructor(
    items: T[],
    paginationParams: PaginationParams,
    total: number,
    metadata?: ResponseMetadata,
  ) {
    const {
      page = 1,
      perPage = 10,
      orderBy,
      orderDirection,
    } = paginationParams;
    const totalPages = Math.ceil(total / perPage);

    const data: PaginationData<T> = {
      items,
      pagination: {
        page,
        perPage,
        total,
        totalPages,
        orderBy,
        orderDirection,
      },
    };

    const responseMetadata: ResponseMetadata = {
      ...metadata,
      timestamp: metadata?.timestamp || new Date().toISOString(),
      pagination: {
        page,
        limit: perPage,
        total,
        totalPages,
      },
    };

    super(true, data, undefined, responseMetadata);
  }

  public static create<T>(
    items: T[],
    paginationParams: PaginationParams,
    total: number,
    requestId?: string,
  ): PaginationResponse<T> {
    const metadata = ResponseBase.createMetadata(requestId);
    return new PaginationResponse(items, paginationParams, total, metadata);
  }

  public static fromPaginationParams<T>(
    items: T[],
    paginationParams: PaginationParams,
    total: number,
    requestId?: string,
  ): PaginationResponse<T> {
    return PaginationResponse.create(items, paginationParams, total, requestId);
  }
}
