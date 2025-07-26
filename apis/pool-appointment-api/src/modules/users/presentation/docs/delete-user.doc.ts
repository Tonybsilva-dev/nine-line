/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: |
 *       Deletes a user. Requires authentication.
 *       - **ADMIN:** Can delete any user
 *       - **MANAGER/USER:** Cannot delete users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Invalid or missing authentication token
 *       403:
 *         description: User does not have permission to delete users
 *       404:
 *         description: User not found
 */
