/**
 * @swagger
 * /appointments/{id}/reject:
 *   patch:
 *     summary: Rejeitar um agendamento
 *     description: Rejeita um agendamento pendente ou confirmado, alterando seu status para CANCELLED
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
 *         description: ID do agendamento a ser rejeitado
 *     responses:
 *       200:
 *         description: Agendamento rejeitado com sucesso
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
 *                   enum: [CANCELLED]
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Agendamento não pode ser rejeitado (não está pendente ou confirmado)
 *       401:
 *         description: Token de autenticação inválido ou ausente
 *       403:
 *         description: Usuário não tem permissão para rejeitar agendamentos
 *       404:
 *         description: Agendamento não encontrado
 */
