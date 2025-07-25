/**
 * @swagger
 * /ratings:
 *   post:
 *     summary: Creates a new rating for a space
 *     tags: [Ratings]
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
 */
// Example payload:
// {
//   "spaceId": "space-uuid",
//   "userId": "user-uuid",
//   "score": 5,
//   "comment": "Great space!"
// }
