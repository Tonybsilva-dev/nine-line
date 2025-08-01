/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user
 *     description: "Authenticates a user with email and password, returning access and refresh tokens. User data is cached in Redis for 5 minutes to optimize subsequent requests."
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: "User's email"
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: "User's password"
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: "Authentication successful - User data cached in Redis"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 accessToken:
 *                   type: string
 *                   description: "JWT access token (valid for 15 minutes)"
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 refreshToken:
 *                   type: string
 *                   description: "JWT refresh token (valid for 7 days)"
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "user@example.com"
 *                     role:
 *                       type: string
 *                       enum: [USER, MANAGER, ADMIN]
 *                       example: "USER"
 *                 cacheInfo:
 *                   type: object
 *                   properties:
 *                     cached:
 *                       type: boolean
 *                       description: "Indicates if user data was cached in Redis"
 *                       example: true
 *                     ttl:
 *                       type: integer
 *                       description: "Cache TTL in seconds"
 *                       example: 300
 *       401:
 *         description: "Invalid credentials"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Invalid email or password"
 *                     code:
 *                       type: string
 *                       enum: [INVALID_CREDENTIALS, USER_INACTIVE]
 *                     statusCode:
 *                       type: integer
 *                       example: 401
 *       429:
 *         description: "Too many authentication attempts"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Too many authentication attempts"
 *                     code:
 *                       type: string
 *                       enum: [RATE_LIMIT_EXCEEDED]
 *                     statusCode:
 *                       type: integer
 *                       example: 429
 *
 * @swagger
 * components:
 *   schemas:
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         accessToken:
 *           type: string
 *           description: "JWT access token"
 *         refreshToken:
 *           type: string
 *           description: "JWT refresh token"
 *         user:
 *           $ref: '#/components/schemas/User'
 *         cacheInfo:
 *           type: object
 *           properties:
 *             cached:
 *               type: boolean
 *               description: "Indicates if user data was cached"
 *             ttl:
 *               type: integer
 *               description: "Cache TTL in seconds"
 *
 * @swagger
 * components:
 *   responses:
 *     AuthenticationSuccess:
 *       description: "Authentication successful"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationResponse'
 *
 * @swagger
 * components:
 *   responses:
 *     AuthenticationFailed:
 *       description: "Authentication failed"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationError'
 */
