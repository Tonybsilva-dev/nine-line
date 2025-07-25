/**
 * @swagger
 * /ratings/{id}:
 *   get:
 *     summary: Busca uma avaliação pelo ID
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da avaliação
 *     responses:
 *       200:
 *         description: Avaliação encontrada
 *       404:
 *         description: Avaliação não encontrada
 *     description: |
 *       - **USER:** Can view any rating.
 *       - **MANAGER:** Can view any rating.
 *       - **ADMIN:** Can view any rating.
 */
