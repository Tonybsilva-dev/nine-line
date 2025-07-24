/**
 * @swagger
 * /appointments/{id}/approve:
 *   patch:
 *     summary: Aprovar um agendamento
 *     description: Aprova um agendamento pendente, alterando seu status para CONFIRMED
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do agendamento a ser aprovado
 *     responses:
 *       200:
 *         description: Agendamento aprovado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 userId:
 *                   type: string
 *                   format: uuid
 *                 spaceId:
 *                   type: string
 *                   format: uuid
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 startTime:
 *                   type: string
 *                   format: date-time
 *                 endTime:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: string
 *                   enum: [CONFIRMED]
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Agendamento não pode ser aprovado (não está pendente)
 *       401:
 *         description: Token de autenticação inválido ou ausente
 *       403:
 *         description: Usuário não tem permissão para aprovar agendamentos
 *       404:
 *         description: Agendamento não encontrado
 */
