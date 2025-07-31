/**
 * @swagger
 * /auth/authenticate:
 *   post:
 *     summary: Authenticate user
 *     description: "Authenticates a user with email and password, returning access and refresh tokens"
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
 *               password:
 *                 type: string
 *                 description: "User's password"
 *     responses:
 *       200:
 *         description: "Authentication successful"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: "JWT access token (valid for 15 minutes)"
 *                 refreshToken:
 *                   type: string
 *                   description: "JWT refresh token (valid for 7 days)"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *                     role:
 *                       type: string
 *       401:
 *         description: "Invalid credentials"
 */
