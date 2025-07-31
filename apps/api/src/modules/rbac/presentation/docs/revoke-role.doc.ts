/**
 * @swagger
 * /rbac/revoke-role:
 *   post:
 *     summary: Revoke role from a user
 *     description: "Remove a role assigned to a user"
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
 *                 description: "Role to be revoked"
 *     responses:
 *       200:
 *         description: "Role revoked successfully"
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
 *         description: "Invalid data"
 *       401:
 *         description: "Invalid or missing authentication token"
 *       404:
 *         description: "Role assignment not found"
 */
