import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import { ENV_CONFIG } from './config/env.js';
import { logger } from './config/logger.js';
import { setupSwagger } from './config/swagger.js';
import { routes } from './core/routes/index.routes.js';
import { errorHandler } from './core/middlewares/error-handling.middleware.js';
import { setupGracefulShutdown } from './core/middlewares/graceful-shutdown.middleware.js';
import { applySecurityMiddleware } from './core/middlewares/security.middleware.js';
import { applyRequestLoggerMiddleware } from './core/middlewares/request-logger.middleware.js';
import { initSentry } from './config/sentry.config.js';
import { eventBus } from './core/events/index.js';
import { configureNotificationEvents } from './modules/notifications/application/events/notification-events.config.js';

initSentry();

const app = express();

applySecurityMiddleware(app);
applyRequestLoggerMiddleware(app);

configureNotificationEvents(eventBus);

app.use('/api', routes);

setupSwagger(app);

app.use(errorHandler);

const server = app.listen(ENV_CONFIG.APP_PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${ENV_CONFIG.APP_PORT}`);
});

setupGracefulShutdown(server);
