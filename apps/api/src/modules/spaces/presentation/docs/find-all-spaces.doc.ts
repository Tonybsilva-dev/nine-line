/**
 * @swagger
 * /spaces:
 *   get:
 *     summary: List all spaces with pagination
 *     description: |
 *       Lists all spaces with pagination. Requires authentication.
 *       - **ADMIN:** Can list all spaces.
 *       - **MANAGER:** Can list only spaces where they are the host.
 *       - **USER:** Can list all spaces.
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: "Page (default: 1)"
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: "Items per page (default: 10)"
 *     responses:
 *       200:
 *         description: List of spaces
 *       400:
 *         description: Invalid pagination parameters
 *       401:
 *         description: Invalid or missing authentication token
 */
