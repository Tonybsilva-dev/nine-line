/**
 * @swagger
 * /spaces/{id}:
 *   get:
 *     summary: Find space by ID
 *     description: |
 *       Retrieves a space by ID. Requires authentication.
 *       - **ADMIN:** Can view any space.
 *       - **MANAGER:** Can view only spaces where they are the host.
 *       - **USER:** Can view any space.
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID of the space to retrieve"
 *     responses:
 *       200:
 *         description: "Space found"
 *       401:
 *         description: "Invalid or missing authentication token"
 *       403:
 *         description: "User does not have permission to view this space"
 *       404:
 *         description: "Space not found"
 */
