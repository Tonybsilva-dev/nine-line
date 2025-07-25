/**
 * @swagger
 * /spaces/{id}:
 *   delete:
 *     summary: Delete a space by ID
 *     description: |
 *       - **ADMIN:** Can delete any space.
 *       - **MANAGER:** Can delete only spaces where they are the host.
 *       - **USER:** Cannot delete spaces.
 *     tags: [Spaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Space ID
 *     responses:
 *       204:
 *         description: Space deleted successfully
 *       404:
 *         description: Space not found
 */
