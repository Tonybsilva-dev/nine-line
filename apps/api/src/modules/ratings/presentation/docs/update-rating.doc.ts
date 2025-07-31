/**
 * @swagger
 * /ratings/{id}:
 *   put:
 *     summary: Update an existing rating
 *     description: |
 *       Updates an existing rating. Requires authentication.
 *       - **USER:** Can update only their own ratings.
 *       - **MANAGER/ADMIN:** Cannot update ratings.
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "Rating ID"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *                 description: "Score (1 to 5)"
 *               comment:
 *                 type: string
 *                 description: "Comment"
 *     responses:
 *       200:
 *         description: "Rating updated successfully"
 *       400:
 *         description: "Invalid data"
 *       401:
 *         description: "Invalid or missing authentication token"
 *       403:
 *         description: "User does not have permission to update this rating"
 *       404:
 *         description: "Rating not found"
 */
// Example payload:
// {
//   "score": 4,
//   "comment": "Update comment."
// }
