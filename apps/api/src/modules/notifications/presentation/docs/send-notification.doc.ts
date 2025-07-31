/**
 * @swagger
 * /notifications/send:
 *   post:
 *     summary: Enviar notificação
 *     description: "Envia uma notificação (email, SMS, push) para um usuário específico"
 *     tags: [Notifications]
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
 *               - type
 *               - templateId
 *               - payload
 *             properties:
 *               userId:
 *                 type: string
 *                 description: "ID do usuário que receberá a notificação"
 *                 example: "clx1234567890abcdef"
 *               type:
 *                 type: string
 *                 enum: [EMAIL, SMS, PUSH]
 *                 description: "Tipo de notificação"
 *                 example: "EMAIL"
 *               templateId:
 *                 type: string
 *                 description: "ID do template de notificação"
 *                 example: "welcome-email"
 *               payload:
 *                 type: object
 *                 description: "Dados para preencher o template"
 *                 example:
 *                   userName: "João Silva"
 *                   userEmail: "joao@example.com"
 *                   appUrl: "http://localhost:3000"
 *     responses:
 *       201:
 *         description: "Notificação enviada com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notificação enviada com sucesso"
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "clx1234567890abcdef"
 *                     type:
 *                       type: string
 *                       example: "EMAIL"
 *                     templateId:
 *                       type: string
 *                       example: "welcome-email"
 *       400:
 *         description: "Dados inválidos"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   example:
 *                     userId: ["userId é obrigatório"]
 *                     type: ["type deve ser EMAIL, SMS ou PUSH"]
 *       401:
 *         description: "Não autorizado"
 *       403:
 *         description: "Sem permissão para enviar notificações"
 *       404:
 *         description: "Usuário ou template não encontrado"
 *       500:
 *         description: "Erro interno do servidor"
 */
