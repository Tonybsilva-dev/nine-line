/**
 * @swagger
 * /notifications/templates:
 *   get:
 *     summary: Listar templates de notificação
 *     description: Lista todos os templates de notificação disponíveis
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
 *         name: type
 *         schema:
 *           type: string
 *           enum: [EMAIL, SMS, PUSH]
 *         description: Filtrar por tipo de template
 *     responses:
 *       200:
 *         description: Lista de templates de notificação
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
 *                       name:
 *                         type: string
 *                         example: "welcome-email"
 *                       type:
 *                         type: string
 *                         example: "EMAIL"
 *                       subject:
 *                         type: string
 *                         example: "Bem-vindo ao 9line Spaces!"
 *                       body:
 *                         type: string
 *                         example: "<h1>Bem-vindo, {{userName}}!</h1>"
 *                       variables:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["userName", "userEmail", "appUrl"]
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-01T09:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-01T09:00:00Z"
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
 *                       example: 5
 *                     totalPages:
 *                       type: integer
 *                       example: 1
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Sem permissão para visualizar templates
 *       500:
 *         description: Erro interno do servidor
 */
