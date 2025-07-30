/**
 * @swagger
 * /ratings/user/{userId}:
 *   get:
 *     summary: List user ratings
 *     description: |
 *       Lists all ratings for a specific user. Requires authentication.
 *       - **USER:** Can view any rating.
 *       - **MANAGER:** Can view any rating.
 *       - **ADMIN:** Can view any rating.
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: "Page (default: 1)"
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: number
 *         description: "Items per page (default: 10)"
 *     responses:
 *       200:
 *         description: Ratings list
 *       400:
 *         description: Invalid pagination parameters
 *       401:
 *         description: Invalid or missing authentication token
 */
