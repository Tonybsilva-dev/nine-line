import * as Sentry from '@sentry/node';
import { ENV_CONFIG } from './env';

export function initSentry() {
  Sentry.init({
    dsn: ENV_CONFIG.SENTRY_DSN,
    environment: ENV_CONFIG.NODE_ENV,
    tracesSampleRate: ENV_CONFIG.NODE_ENV === 'production' ? 0.1 : 1.0,
    profilesSampleRate: ENV_CONFIG.NODE_ENV === 'production' ? 0.1 : 1.0,
    enableLogs: ENV_CONFIG.NODE_ENV === 'production' ? false : true,
    sendDefaultPii: ENV_CONFIG.NODE_ENV === 'production' ? true : false,
    beforeSend(event) {
      if (ENV_CONFIG.NODE_ENV === 'development') {
        console.log('Sentry Event:', event);
      }
      return event;
    },
  });
}

export function captureException(error: Error) {
  Sentry.captureException(error);
}
