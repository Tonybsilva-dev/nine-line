/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Atualizar agendamento
 *     description: |
 *       Atualiza um agendamento existente com regras específicas por role:
 *
 *       **USER:**
 *       - Só pode atualizar seus próprios agendamentos
 *       - Qualquer alteração de data/hora volta o status para PENDING
 *       - Pode cancelar seu próprio agendamento (CANCELLED)
 *       - Não pode alterar outros status diretamente
 *
 *       **MANAGER:**
 *       - Só pode atualizar seus próprios agendamentos
 *       - Pode cancelar seus próprios agendamentos (CANCELLED)
 *       - Pode rejeitar seus próprios agendamentos (REJECTED)
 *       - Pode alterar status para PENDING
 *
 *       **ADMIN:**
 *       - Pode atualizar qualquer agendamento
 *       - Pode alterar qualquer campo e status
 *
 *       **Status:**
 *       - PENDING: Agendamento pendente de aprovação
 *       - CONFIRMED: Agendamento aprovado
 *       - CANCELLED: Agendamento cancelado pelo usuário
 *       - REJECTED: Agendamento rejeitado pelo manager
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do agendamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Nova data do agendamento
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: Novo horário de início
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: Novo horário de fim
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, CANCELLED, REJECTED]
 *                 description: "Novo status do agendamento (restrições por role)"
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
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
 *                   enum: [PENDING, CONFIRMED, CANCELLED, REJECTED]
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: "Dados inválidos, operação não permitida para o role do usuário"
 *       401:
 *         description: Token de autenticação inválido ou ausente
 *       403:
 *         description: "Usuário não tem permissão para atualizar este agendamento"
 *       404:
 *         description: Agendamento não encontrado
 */
