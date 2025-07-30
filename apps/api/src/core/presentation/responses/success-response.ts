import { ResponseBase, ResponseMetadata } from './response-base';

export class SuccessResponse<T = unknown> extends ResponseBase<T> {
  constructor(data: T, metadata?: ResponseMetadata) {
    super(true, data, undefined, metadata);
  }

  public static create<T>(
    data: T,
    requestId?: string,
    additionalMetadata?: Partial<ResponseMetadata>,
  ): SuccessResponse<T> {
    const metadata = {
      ...ResponseBase.createMetadata(requestId),
      ...additionalMetadata,
    };

    return new SuccessResponse(data, metadata);
  }

  public static created<T>(data: T, requestId?: string): SuccessResponse<T> {
    return SuccessResponse.create(data, requestId);
  }

  public static ok<T>(data: T, requestId?: string): SuccessResponse<T> {
    return SuccessResponse.create(data, requestId);
  }

  public static noContent(requestId?: string): SuccessResponse<null> {
    return new SuccessResponse(null, ResponseBase.createMetadata(requestId));
  }
}
