/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: "JWT token obtained from /auth/authenticate"
 *
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: "User unique identifier"
 *         name:
 *           type: string
 *           description: "User's full name"
 *         email:
 *           type: string
 *           format: email
 *           description: "User's email address"
 *         role:
 *           type: string
 *           enum: [USER, MANAGER, ADMIN]
 *           description: "User's role in the system"
 *
 *     AuthenticationError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: "Error message"
 *             code:
 *               type: string
 *               enum: [UNAUTHORIZED, TOKEN_EXPIRED, INVALID_TOKEN, USER_NOT_FOUND]
 *             statusCode:
 *               type: integer
 *               example: 401
 *
 *   responses:
 *     Unauthorized:
 *       description: "Authentication required or failed"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationError'
 *
 *     TokenExpired:
 *       description: "Access token has expired"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationError'
 *
 *     InvalidToken:
 *       description: "Invalid or malformed token"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationError'
 *
 *     UserNotFound:
 *       description: "User not found or inactive"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationError'
 */

/**
 * Authentication Middleware Documentation
 *
 * The authentication system implements a robust middleware with Redis caching for optimal performance.
 *
 * ## Features
 *
 * ### Cache Redis
 * - **TTL**: 5 minutes
 * - **Key Format**: `auth:user:{userId}`
 * - **Data**: User information (id, name, email, role, status)
 * - **Auto-invalidation**: When user is deactivated
 *
 * ### Security
 * - JWT token validation
 * - User status verification (ACTIVE only)
 * - Soft delete protection
 * - Token expiration handling
 *
 * ### Performance
 * - Cache-first approach
 * - Database fallback
 * - Structured logging
 * - Error differentiation
 *
 * ## Usage
 *
 * ```typescript
 * import { ensureAuthenticated } from '@/modules/auth/presentation/middlewares/authentication.middleware';
 *
 * // Protected route
 * app.get('/protected', ensureAuthenticated, controller);
 *
 * // Optional authentication
 * app.get('/public', optionalAuth, controller);
 * ```
 *
 * ## Cache Management
 *
 * ```typescript
 * import { invalidateUserCache } from '@/modules/auth/presentation/middlewares/authentication.middleware';
 *
 * // Invalidate cache on logout or profile update
 * await invalidateUserCache(userId);
 * ```
 *
 * ## Logs
 *
 * ### Success (Cache Hit)
 * ```json
 * {
 *   "type": "authentication_success_cached",
 *   "userId": "user123",
 *   "userEmail": "user@example.com",
 *   "method": "GET",
 *   "url": "/api/protected"
 * }
 * ```
 *
 * ### Success (Database Hit)
 * ```json
 * {
 *   "type": "authentication_success_db",
 *   "userId": "user123",
 *   "userEmail": "user@example.com",
 *   "method": "GET",
 *   "url": "/api/protected"
 * }
 * ```
 *
 * ### Cache Invalidated
 * ```json
 * {
 *   "type": "user_cache_invalidated",
 *   "userId": "user123"
 * }
 * ```
 *
 * ## Error Handling
 *
 * - **Token Missing**: 401 Unauthorized
 * - **Invalid Token**: 401 Unauthorized
 * - **Expired Token**: 401 Unauthorized
 * - **User Not Found**: 401 Unauthorized
 * - **User Inactive**: 401 Unauthorized
 *
 * ## Integration with RBAC
 *
 * The authentication middleware works seamlessly with the RBAC system:
 *
 * ```typescript
 * import { ensureAuthenticated } from '@/modules/auth/presentation/middlewares/authentication.middleware';
 * import { requirePermission } from '@/modules/rbac/presentation/middlewares/authorization.middleware';
 *
 * app.post('/appointments',
 *   ensureAuthenticated,        // Verify JWT and user status
 *   requirePermission('create'), // Check permissions
 *   controller
 * );
 * ```
 */
