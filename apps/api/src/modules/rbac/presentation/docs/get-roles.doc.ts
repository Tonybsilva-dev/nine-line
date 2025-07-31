/**
 * @swagger
 * /rbac/roles:
 *   get:
 *     summary: List roles
 *     description: "Lists all available roles in the system with pagination"
 *     tags: [RBAC]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: "Page number"
 *       - name: perPage
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: "Items per page"
 *     responses:
 *       200:
 *         description: "List of roles"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       level:
 *                         type: integer
 *                       isSystem:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *       401:
 *         description: "Invalid or missing authentication token"
 */
