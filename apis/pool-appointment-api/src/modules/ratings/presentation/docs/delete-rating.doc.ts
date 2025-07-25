/**
 * @swagger
 * /ratings/{id}:
 *   delete:
 *     summary: Delete a rating
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Rating ID
 *     responses:
 *       204:
 *         description: Rating deleted successfully
 *       404:
 *         description: Rating not found
 *     description: |
 *       - **USER:** Can delete only their own ratings.
 *       - **MANAGER:** Cannot delete ratings.
 *       - **ADMIN:** Cannot delete ratings.
 */
