/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Fazer logout
 *     description: Invalida o token de acesso atual, adicionando-o à blacklist
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
 *                 description: "Token de acesso a ser invalidado (opcional, usa o token do header se não fornecido)"
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout realizado com sucesso"
 *       401:
 *         description: Token de autenticação inválido ou ausente
 */
