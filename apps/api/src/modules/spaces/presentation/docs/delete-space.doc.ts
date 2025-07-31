/**
 * @swagger
 * /spaces/{id}:
 *   delete:
 *     summary: Delete a space
 *     description: |
 *       Deletes a space. Requires authentication.
 *       - **ADMIN:** Can delete any space.
 *       - **MANAGER:** Can delete only spaces where they are the host.
 *       - **USER:** Cannot delete spaces.
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "Space ID"
 *     responses:
 *       204:
 *         description: "Space deleted successfully"
 *       401:
 *         description: "Invalid or missing authentication token"
 *       403:
 *         description: "User does not have permission to delete this space"
 *       404:
 *         description: "Space not found"
 */
