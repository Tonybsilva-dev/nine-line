/**
 * @swagger
 * /ratings/{id}:
 *   put:
 *     summary: Update an existing rating
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Rating ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *                 description: Score (1 to 5)
 *               comment:
 *                 type: string
 *                 description: Comment
 *     responses:
 *       200:
 *         description: Rating updated successfully
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Rating not found
 *     description: |
 *       - **USER:** Can update only their own ratings.
 *       - **MANAGER:** Cannot update ratings.
 *       - **ADMIN:** Cannot update ratings.
 */
// Example payload:
// {
//   "score": 4,
//   "comment": "Update comment."
// }
