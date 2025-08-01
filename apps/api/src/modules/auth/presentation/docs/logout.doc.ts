/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: "Invalidates the current access token and clears user cache from Redis"
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: "Access token to invalidate (optional, uses token from header if not provided)"
 *     responses:
 *       200:
 *         description: "Logout successful - Token invalidated and cache cleared"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout successful"
 *                 cacheCleared:
 *                   type: boolean
 *                   description: "Indicates if user cache was cleared from Redis"
 *                   example: true
 *       401:
 *         description: "Invalid or missing authentication token"
 *       500:
 *         description: "Internal server error during logout process"
 *
 * @swagger
 * components:
 *   schemas:
 *     LogoutResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Logout successful"
 *         cacheCleared:
 *           type: boolean
 *           description: "Indicates if user cache was cleared from Redis"
 *           example: true
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: "Logout timestamp"
 *
 * @swagger
 * components:
 *   responses:
 *     LogoutSuccess:
 *       description: "Logout successful"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LogoutResponse'
 *
 * @swagger
 * components:
 *   responses:
 *     LogoutError:
 *       description: "Logout failed"
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               error:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: "Error message"
 *                   code:
 *                     type: string
 *                     enum: [UNAUTHORIZED, INTERNAL_ERROR]
 *                   statusCode:
 *                     type: integer
 *                     example: 401
 */
