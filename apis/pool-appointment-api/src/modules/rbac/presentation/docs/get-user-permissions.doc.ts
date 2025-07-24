/**
 * @swagger
 * /rbac/users/{userId}/permissions:
 *   get:
 *     summary: Obter permissões de um usuário
 *     description: Retorna todas as permissões que um usuário possui através de suas roles
 *     tags: [RBAC]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Permissões do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 permissions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: "Nome da permissão (formato resource:action)"
 *                       description:
 *                         type: string
 *                       resource:
 *                         type: string
 *                       action:
 *                         type: string
 *       401:
 *         description: Token de autenticação inválido ou ausente
 *       404:
 *         description: Usuário não encontrado
 */
