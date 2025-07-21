export interface ResponseMetadata {
  timestamp: string;
  requestId?: string;
  version?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface BaseResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    statusCode: number;
    details?: Record<string, unknown>;
  };
  metadata?: ResponseMetadata;
}

export abstract class ResponseBase<T = unknown> {
  protected constructor(
    public readonly success: boolean,
    public readonly data?: T,
    public readonly error?: {
      message: string;
      code: string;
      statusCode: number;
      details?: Record<string, unknown>;
    },
    public readonly metadata?: ResponseMetadata,
  ) {}

  public toJSON(): BaseResponse<T> {
    return {
      success: this.success,
      ...(this.data && { data: this.data }),
      ...(this.error && { error: this.error }),
      ...(this.metadata && { metadata: this.metadata }),
    };
  }

  public static createMetadata(requestId?: string): ResponseMetadata {
    return {
      timestamp: new Date().toISOString(),
      requestId,
      version: process.env.npm_package_version || '1.0.0',
    };
  }
}
