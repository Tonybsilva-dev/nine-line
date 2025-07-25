/**
 * @swagger
 * /spaces/{id}:
 *   put:
 *     summary: Update a space by ID
 *     description: |
 *       - **ADMIN:** Can update any space.
 *       - **MANAGER:** Can update only spaces where they are the host.
 *       - **USER:** Cannot update spaces.
 *     tags: [Spaces]
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
 *               description:
 *                 type: string
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *               rules:
 *                 type: string
 *     responses:
 *       200:
 *         description: Space updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Space not found
 */
