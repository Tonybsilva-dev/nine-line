/**
 * @swagger
 * /rbac/assign-role:
 *   post:
 *     summary: Atribuir role a um usuário
 *     description: Atribui uma role específica a um usuário com data de expiração opcional
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
 *                 description: ID da role a ser atribuída
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 description: "Data de expiração da atribuição (opcional)"
 *               assignedBy:
 *                 type: string
 *                 format: uuid
 *                 description: "ID do usuário que está fazendo a atribuição (opcional)"
 *     responses:
 *       201:
 *         description: Role atribuída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 userId:
 *                   type: string
 *                   format: uuid
 *                 roleId:
 *                   type: string
 *                   format: uuid
 *                 assignedBy:
 *                   type: string
 *                   format: uuid
 *                 assignedAt:
 *                   type: string
 *                   format: date-time
 *                 expiresAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token de autenticação inválido ou ausente
 *       404:
 *         description: Usuário ou role não encontrado
 */
