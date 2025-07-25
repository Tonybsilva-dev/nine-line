/**
 * @swagger
 * /spaces:
 *   get:
 *     summary: Lista todos os espaços
 *     description: |
 *       - **ADMIN:** Can list all spaces.
 *       - **MANAGER:** Can list only spaces where they are the host.
 *       - **USER:** Can list all spaces.
 *     tags: [Spaces]
 *     responses:
 *       200:
 *         description: Lista de espaços retornada com sucesso
 */
