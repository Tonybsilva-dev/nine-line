/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     description: "Returns the health status of the application and its dependencies (database, Redis)"
 *     tags: [System]
 *     responses:
 *       200:
 *         description: "Application is healthy"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-31T22:55:04.970Z"
 *                 uptime:
 *                   type: number
 *                   description: "Application uptime in seconds"
 *                   example: 237.826921858
 *                 environment:
 *                   type: string
 *                   example: "development"
 *                 services:
 *                   type: object
 *                   properties:
 *                     database:
 *                       type: string
 *                       enum: [OK, ERROR]
 *                       example: "OK"
 *                     redis:
 *                       type: string
 *                       enum: [OK, ERROR]
 *                       example: "OK"
 *       503:
 *         description: "Application is unhealthy"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-31T22:55:04.970Z"
 *                 uptime:
 *                   type: number
 *                   description: "Application uptime in seconds"
 *                   example: 237.826921858
 *                 environment:
 *                   type: string
 *                   example: "development"
 *                 services:
 *                   type: object
 *                   properties:
 *                     database:
 *                       type: string
 *                       enum: [OK, ERROR]
 *                       example: "ERROR"
 *                     redis:
 *                       type: string
 *                       enum: [OK, ERROR]
 *                       example: "ERROR"
 *
 * @swagger
 * components:
 *   schemas:
 *     HealthCheck:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [OK, ERROR]
 *           description: "Overall health status"
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: "Health check timestamp"
 *         uptime:
 *           type: number
 *           description: "Application uptime in seconds"
 *         environment:
 *           type: string
 *           description: "Current environment"
 *         services:
 *           type: object
 *           properties:
 *             database:
 *               type: string
 *               enum: [OK, ERROR]
 *               description: "Database connection status"
 *             redis:
 *               type: string
 *               enum: [OK, ERROR]
 *               description: "Redis connection status"
 *
 *   responses:
 *     HealthCheckSuccess:
 *       description: "Application is healthy"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HealthCheck'
 *
 *     HealthCheckError:
 *       description: "Application is unhealthy"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HealthCheck'
 */
