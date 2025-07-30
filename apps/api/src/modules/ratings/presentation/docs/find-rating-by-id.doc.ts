/**
 * @swagger
 * /ratings/{id}:
 *   get:
 *     summary: Find rating by ID
 *     description: |
 *       Retrieves a rating by ID. Requires authentication.
 *       - **USER:** Can view any rating.
 *       - **MANAGER:** Can view any rating.
 *       - **ADMIN:** Can view any rating.
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Rating ID
 *     responses:
 *       200:
 *         description: Rating found
 *       401:
 *         description: Invalid or missing authentication token
 *       404:
 *         description: Rating not found
 */
