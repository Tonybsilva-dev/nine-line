/**
 * @swagger
 * /users:
 *   get:
 *     summary: List users with pagination
 *     tags: [Users]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *       - name: perPage
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of users
 *       400:
 *         description: Invalid parameters
 */
