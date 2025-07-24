/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Renovar token de acesso
 *     description: Renova o token de acesso usando um refresh token válido
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Token de refresh válido
 *     responses:
 *       200:
 *         description: Token renovado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: "Novo token de acesso JWT (válido por 15 minutos)"
 *                 refreshToken:
 *                   type: string
 *                   description: "Novo token de refresh JWT (válido por 7 dias)"
 *       401:
 *         description: Refresh token inválido ou expirado
 */
