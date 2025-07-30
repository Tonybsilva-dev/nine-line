/**
 * @swagger
 * /rbac/users/{userId}/permissions:
 *   get:
 *     summary: Get user permissions
 *     description: Returns all permissions a user has through their roles
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
 *         description: User ID
 *     responses:
 *       200:
 *         description: User permissions
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
 *                         description: "Permission name (resource:action format)"
 *                       description:
 *                         type: string
 *                       resource:
 *                         type: string
 *                       action:
 *                         type: string
 *       401:
 *         description: Invalid or missing authentication token
 *       404:
 *         description: User not found
 */
