/**
 * @swagger
 * /spaces/{id}:
 *   put:
 *     summary: Update a space
 *     description: |
 *       Updates a space. Requires authentication.
 *       - **ADMIN:** Can update any space.
 *       - **MANAGER:** Can update only spaces where they are the host.
 *       - **USER:** Cannot update spaces.
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Space ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: New title for the space
 *               description:
 *                 type: string
 *                 description: New description for the space
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: New array of photo URLs for the space
 *               rules:
 *                 type: string
 *                 description: New rules for the space
 *     responses:
 *       200:
 *         description: Space updated successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Invalid or missing authentication token
 *       403:
 *         description: User does not have permission to update this space
 *       404:
 *         description: Space not found
 */
