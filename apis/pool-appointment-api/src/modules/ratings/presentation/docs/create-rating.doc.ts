/**
 * @swagger
 * /ratings:
 *   post:
 *     summary: Creates a new rating for a space
 *     description: |
 *       Creates a new rating for a space. Requires authentication.
 *       - **USER:** Can create ratings for spaces they have used.
 *       - **MANAGER/ADMIN:** Cannot create ratings.
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               spaceId:
 *                 type: string
 *                 description: Space ID
 *               userId:
 *                 type: string
 *                 description: User ID
 *               score:
 *                 type: number
 *                 description: Score (1 to 5)
 *               comment:
 *                 type: string
 *                 description: Comment
 *     responses:
 *       201:
 *         description: Rating created successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Invalid or missing authentication token
 *       403:
 *         description: User does not have permission to create ratings
 */
// Example payload:
// {
//   "spaceId": "space-uuid",
//   "userId": "user-uuid",
//   "score": 5,
//   "comment": "Great space!"
// }
