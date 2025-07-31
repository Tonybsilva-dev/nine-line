/**
 * @swagger
 * /spaces:
 *   post:
 *     summary: Create a new space
 *     description: |
 *       Creates a new space. Requires authentication.
 *       - **ADMIN:** Can create a space for any host.
 *       - **MANAGER:** Can create a space only for themselves (hostId is always their userId).
 *       - **USER:** Cannot create spaces.
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: "Space title"
 *               description:
 *                 type: string
 *                 description: "Space description"
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array of photo URLs"
 *               rules:
 *                 type: string
 *                 description: "Space rules"
 *               hostId:
 *                 type: string
 *                 description: "ID of the user who owns/hosts the space (required for ADMIN, auto-set for MANAGER)"
 *     responses:
 *       201:
 *         description: "Space created successfully"
 *       400:
 *         description: "Invalid data"
 *       401:
 *         description: "Invalid or missing authentication token"
 *       403:
 *         description: "User does not have permission to create spaces"
 */
