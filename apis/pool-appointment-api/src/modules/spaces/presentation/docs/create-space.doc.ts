/**
 * @swagger
 * /spaces:
 *   post:
 *     summary: Create a new space
 *     description: |
 *       - **ADMIN:** Can create a space for any host.
 *       - **MANAGER:** Can create a space only for themselves (hostId is always their userId).
 *       - **USER:** Cannot create spaces.
 *     tags: [Spaces]
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
 *               hostId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Space created successfully
 *       400:
 *         description: Validation error
 */
