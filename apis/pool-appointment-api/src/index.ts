import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import { routes } from './core/routes/index.routes.js';
import { setupSwagger } from './config/swagger';
import { errorHandler } from './core/middlewares/error-handling';
import { requestLoggerMiddleware } from './core/middlewares/request-logger';
import { setupGracefulShutdown } from './core/middlewares/graceful-shutdown';
import { ENV_CONFIG } from './config/env';
import { helmetOptions } from './config/helmet-options';
import { limiter } from './config/rate-limiter';
import { logger } from './config/logger';
import { eventBus } from './core/events';
import { configureUserEvents } from './modules/users/application/events/user-events.config';
import { configureSpaceEvents } from './modules/spaces/application/events/space-events.config';
import { configureAppointmentEvents } from './modules/appointments/application/events/appointment-events.config';
import { configureRatingEvents } from './modules/ratings/application/events/rating-events.config';

const app = express();

app.use(helmet(helmetOptions));
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add request logging middleware
app.use(requestLoggerMiddleware);

app.use(limiter);

// Configurar eventos de domínio
configureUserEvents(eventBus);
configureSpaceEvents(eventBus);
configureAppointmentEvents(eventBus);
configureRatingEvents(eventBus);

app.use('/api', routes);
setupSwagger(app);

app.use(errorHandler);

const server = app.listen(ENV_CONFIG.APP_PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${ENV_CONFIG.APP_PORT}`);
});

// Setup graceful shutdown
setupGracefulShutdown(server);
