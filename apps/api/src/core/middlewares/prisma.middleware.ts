import { Prisma } from '@prisma/client';

export const softDeleteMiddleware = async (
  params: Prisma.MiddlewareParams,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: (params: Prisma.MiddlewareParams) => Promise<any>,
) => {
  if (params.model === 'User') {
    const deletedData = {
      deletedAt: new Date(),
      status: 'INACTIVE',
    };

    if (params.action === 'delete') {
      params.action = 'update';
      params.args['data'] = deletedData;
    }

    if (params.action === 'deleteMany') {
      params.action = 'updateMany';
      if (!params.args.data) {
        params.args['data'] = {};
      }
      params.args.data = {
        ...(params.args.data as Record<string, unknown>),
        ...deletedData,
      };
    }
  }

  return next(params);
};
