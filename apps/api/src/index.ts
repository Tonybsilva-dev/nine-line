import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import { routes } from './core/routes/index.routes.js';
import { setupSwagger } from './config/swagger.js';
import { errorHandler } from './core/middlewares/error-handling.js';
import { requestLoggerMiddleware } from './core/middlewares/request-logger.js';
import { setupGracefulShutdown } from './core/middlewares/graceful-shutdown.js';
import { ENV_CONFIG } from './config/env.js';
import { helmetOptions } from './config/helmet-options.js';
import { logger } from './config/logger.js';
import { eventBus } from './core/events/index.js';
import { configureNotificationEvents } from './modules/notifications/application/events/notification-events.config.js';

const app = express();

app.use(helmet(helmetOptions));
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLoggerMiddleware);

configureNotificationEvents(eventBus);

app.use('/api', routes);
setupSwagger(app);

app.use(errorHandler);

const server = app.listen(ENV_CONFIG.APP_PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${ENV_CONFIG.APP_PORT}`);
});

setupGracefulShutdown(server);
