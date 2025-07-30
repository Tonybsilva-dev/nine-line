/**
 * @swagger
 * /ratings/{id}:
 *   delete:
 *     summary: Delete a rating
 *     description: |
 *       Deletes a rating. Requires authentication.
 *       - **USER:** Can delete only their own ratings.
 *       - **MANAGER/ADMIN:** Cannot delete ratings.
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
 *       204:
 *         description: Rating deleted successfully
 *       401:
 *         description: Invalid or missing authentication token
 *       403:
 *         description: User does not have permission to delete this rating
 *       404:
 *         description: Rating not found
 */
