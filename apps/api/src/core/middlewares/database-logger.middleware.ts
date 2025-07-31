import { performanceLogger } from '../../config/logger';

export function createDatabaseLogger() {
  return {
    query: (query: string, params: unknown[], duration: number) => {
      if (duration > 100) {
        performanceLogger.warn({
          type: 'slow_query',
          query: query.substring(0, 200) + (query.length > 200 ? '...' : ''),
          duration,
          params: params.length > 0 ? '[PRESENT]' : '[EMPTY]',
          threshold: 100,
        });
      }

      performanceLogger.debug({
        type: 'database_query',
        query: query.substring(0, 100) + (query.length > 100 ? '...' : ''),
        duration,
        params: params.length > 0 ? '[PRESENT]' : '[EMPTY]',
      });
    },

    error: (error: Error, query: string) => {
      performanceLogger.error({
        type: 'database_error',
        error: error.message,
        query: query.substring(0, 200) + (query.length > 200 ? '...' : ''),
        stack: error.stack,
      });
    },
  };
}
