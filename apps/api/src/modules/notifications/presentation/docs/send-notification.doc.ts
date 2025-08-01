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
 *
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: "Unique notification identifier"
 *         userId:
 *           type: string
 *           format: uuid
 *           description: "ID of the user who received the notification"
 *         type:
 *           type: string
 *           enum: [EMAIL, SMS, PUSH]
 *           description: "Type of notification"
 *         templateId:
 *           type: string
 *           description: "ID of the notification template"
 *         payload:
 *           type: object
 *           description: "Data used to fill the template"
 *         status:
 *           type: string
 *           enum: [PENDING, SENT, FAILED, DELIVERED]
 *           description: "Current status of the notification"
 *         sentAt:
 *           type: string
 *           format: date-time
 *           description: "Timestamp when notification was sent"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: "Notification creation timestamp"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: "Last update timestamp"
 *
 *     NotificationTemplate:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: "Unique template identifier"
 *         name:
 *           type: string
 *           description: "Template name"
 *         type:
 *           type: string
 *           enum: [EMAIL, SMS, PUSH]
 *           description: "Template type"
 *         subject:
 *           type: string
 *           description: "Email subject (for email templates)"
 *         content:
 *           type: string
 *           description: "Template content with placeholders"
 *         variables:
 *           type: array
 *           items:
 *             type: string
 *           description: "List of required variables for the template"
 *         isActive:
 *           type: boolean
 *           description: "Whether the template is active"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: "Template creation timestamp"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: "Last update timestamp"
 *
 *     SendNotificationRequest:
 *       type: object
 *       required:
 *         - userId
 *         - type
 *         - templateId
 *         - payload
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: "ID of the user who will receive the notification"
 *           example: "clx1234567890abcdef"
 *         type:
 *           type: string
 *           enum: [EMAIL, SMS, PUSH]
 *           description: "Type of notification"
 *           example: "EMAIL"
 *         templateId:
 *           type: string
 *           description: "ID of the notification template"
 *           example: "welcome-email"
 *         payload:
 *           type: object
 *           description: "Data to fill the template"
 *           example:
 *             userName: "João Silva"
 *             userEmail: "joao@example.com"
 *             appUrl: "http://localhost:3000"
 *
 *     NotificationResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Notification sent successfully"
 *         data:
 *           $ref: '#/components/schemas/Notification'
 *
 *     NotificationListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Notification'
 *         pagination:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *               example: 1
 *             limit:
 *               type: integer
 *               example: 10
 *             total:
 *               type: integer
 *               example: 50
 *             totalPages:
 *               type: integer
 *               example: 5
 *
 *     NotificationError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: "Error message"
 *             code:
 *               type: string
 *               enum: [VALIDATION_ERROR, USER_NOT_FOUND, TEMPLATE_NOT_FOUND, SEND_FAILED, UNAUTHORIZED]
 *             statusCode:
 *               type: integer
 *               example: 400
 *
 *   responses:
 *     NotificationSent:
 *       description: "Notification sent successfully"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificationResponse'
 *
 *     NotificationList:
 *       description: "List of notifications retrieved successfully"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificationListResponse'
 *
 *     NotificationError:
 *       description: "Notification operation failed"
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificationError'
 */
