/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     summary: Get notification by ID
 *     description: |
 *       Retrieves a notification by ID. Requires authentication.
 *       - **ADMIN:** Can view any notification
 *       - **MANAGER/USER:** Can only view their own notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: "Notification ID"
 *     responses:
 *       200:
 *         description: "Notification found"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174001"
 *                     type:
 *                       type: string
 *                       enum: [EMAIL, SMS, PUSH]
 *                       example: "EMAIL"
 *                     templateId:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174002"
 *                     status:
 *                       type: string
 *                       enum: [PENDING, SENT, FAILED]
 *                       example: "SENT"
 *                     payload:
 *                       type: object
 *                       example:
 *                         userName: "John Doe"
 *                         userEmail: "john@example.com"
 *                         appUrl: "http://localhost:3000"
 *                         androidAppUrl: "https://play.google.com/store/apps/details?id=com.nineline.app"
 *                         iosAppUrl: "https://apps.apple.com/app/nine-line/id123456789"
 *                     error:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     sentAt:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                       example: "2024-01-01T12:00:00Z"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T12:00:00Z"
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                           example: "123e4567-e89b-12d3-a456-426614174001"
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: "john@example.com"
 *                     template:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                           example: "123e4567-e89b-12d3-a456-426614174002"
 *                         name:
 *                           type: string
 *                           example: "welcome-email"
 *                         type:
 *                           type: string
 *                           enum: [EMAIL, SMS, PUSH]
 *                           example: "EMAIL"
 *                         subject:
 *                           type: string
 *                           example: "Welcome to 9line Spaces! 🎉"
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T12:00:00Z"
 *                     requestId:
 *                       type: string
 *                       example: "abc123def456"
 *                     version:
 *                       type: string
 *                       example: "1.0.0"
 *       400:
 *         description: "Missing notification ID"
 *       401:
 *         description: "Invalid or missing authentication token"
 *       403:
 *         description: "User does not have permission to view this notification"
 *       404:
 *         description: "Notification not found"
 *       500:
 *         description: "Internal server error"
 */
