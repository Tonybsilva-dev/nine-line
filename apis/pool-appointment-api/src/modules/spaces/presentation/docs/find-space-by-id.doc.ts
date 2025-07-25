/**
 * @swagger
 * /spaces/{id}:
 *   get:
 *     summary: Search for a space by ID
 *     description: |
 *       - **ADMIN:** Can view any space.
 *       - **MANAGER:** Can view only spaces where they are the host.
 *       - **USER:** Can view any space.
 *     tags: [Spaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Space ID
 *     responses:
 *       200:
 *         description: Space found
 *       404:
 *         description: Space not found
 */
