/**
 * @swagger
 * /rbac/assign-role:
 *   post:
 *     summary: Assign role to a user
 *     description: "Assign a specific role to a user with optional expiration date"
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
 *                 description: "User ID"
 *               roleId:
 *                 type: string
 *                 format: uuid
 *                 description: "Role ID to be assigned"
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 description: "Expiration date of the assignment (optional)"
 *               assignedBy:
 *                 type: string
 *                 format: uuid
 *                 description: "ID of the user assigning the role (optional)"
 *     responses:
 *       201:
 *         description: "Role assigned successfully"
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
 *         description: "Invalid data"
 *       401:
 *         description: "Invalid or missing authentication token"
 *       404:
 *         description: "User or role not found"
 */
