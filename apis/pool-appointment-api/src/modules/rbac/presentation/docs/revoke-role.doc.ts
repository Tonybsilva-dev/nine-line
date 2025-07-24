/**
 * @swagger
 * /rbac/revoke-role:
 *   post:
 *     summary: Revogar role de um usuário
 *     description: Remove uma role atribuída a um usuário
 *     tags: [RBAC]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - roleId
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: ID do usuário
 *               roleId:
 *                 type: string
 *                 format: uuid
 *                 description: ID da role a ser revogada
 *     responses:
 *       200:
 *         description: Role revogada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Role revoked successfully"
 *                 userId:
 *                   type: string
 *                   format: uuid
 *                 roleId:
 *                   type: string
 *                   format: uuid
 *                 revokedBy:
 *                   type: string
 *                   format: uuid
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token de autenticação inválido ou ausente
 *       404:
 *         description: Atribuição de role não encontrada
 */
