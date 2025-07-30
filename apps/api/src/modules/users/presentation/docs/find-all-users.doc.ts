/**
 * @swagger
 * /users:
 *   get:
 *     summary: List users with pagination
 *     description: |
 *       Lists all users with pagination. Requires authentication.
 *       - **ADMIN:** Can list all users
 *       - **MANAGER/USER:** Cannot list users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *         description: Page number
 *       - name: perPage
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of users
 *       400:
 *         description: Invalid parameters
 *       401:
 *         description: Invalid or missing authentication token
 *       403:
 *         description: User does not have permission to list users
 */
