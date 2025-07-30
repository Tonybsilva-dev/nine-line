/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Listar notificações
 *     description: Lista as notificações do usuário autenticado ou filtra por status
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de itens por página
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, SENT, FAILED]
 *         description: Filtrar por status da notificação
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filtrar por ID do usuário (apenas ADMIN)
 *     responses:
 *       200:
 *         description: Lista de notificações
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "clx1234567890abcdef"
 *                       userId:
 *                         type: string
 *                         example: "clx1234567890abcdef"
 *                       type:
 *                         type: string
 *                         example: "EMAIL"
 *                       templateId:
 *                         type: string
 *                         example: "welcome-email"
 *                       status:
 *                         type: string
 *                         example: "SENT"
 *                       payload:
 *                         type: object
 *                         example:
 *                           userName: "João Silva"
 *                           userEmail: "joao@example.com"
 *                       sentAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-01T10:00:00Z"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-01T09:55:00Z"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 25
 *                     totalPages:
 *                       type: integer
 *                       example: 3
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Sem permissão para visualizar notificações
 *       500:
 *         description: Erro interno do servidor
 */
