/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: |
 *       Retrieves a user by ID. Requires authentication.
 *       - **ADMIN:** Can view any user
 *       - **MANAGER/USER:** Can only view their own profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: "User ID"
 *     responses:
 *       200:
 *         description: "User found"
 *       401:
 *         description: "Invalid or missing authentication token"
 *       403:
 *         description: "User does not have permission to view this user"
 *       404:
 *         description: "User not found"
 */
