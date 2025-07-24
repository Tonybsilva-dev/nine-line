import { AppointmentRepository } from '../../../domain/repositories/appointment-repository';
import { Appointment } from '../../../domain/entities/appointment';
import {
  EntityNotFoundError,
  InvalidOperationError,
  ForbiddenError,
} from '@/core/errors';
import { AppointmentStatus } from '@prisma/client';
import { EventBus } from '@/core/events';
import { AppointmentUpdatedEvent } from '../../../domain/events';

interface UpdateAppointmentDTO {
  id: string;
  date?: Date;
  startTime?: Date;
  endTime?: Date;
  status?: AppointmentStatus;
  userId: string; // ID do usuário que está fazendo a atualização
  userRole: string; // Role do usuário que está fazendo a atualização
}

export class UpdateAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly eventBus?: EventBus,
  ) {}

  async execute(data: UpdateAppointmentDTO): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(data.id);

    if (!appointment) {
      throw new EntityNotFoundError('Appointment', data.id);
    }

    // Verificar permissões baseadas no role do usuário
    this.validateUserPermissions(data.userId, data.userRole, appointment);

    const changes: Record<string, unknown> = {};

    // Lógica específica para cada role
    if (data.userRole === 'USER') {
      // Usuário comum só pode atualizar seus próprios agendamentos
      if (appointment.userId !== data.userId) {
        throw new ForbiddenError(
          'Users can only update their own appointments',
        );
      }

      // Usuário pode cancelar seu próprio agendamento (qualquer status)
      if (data.status === 'CANCELLED') {
        changes.status = 'CANCELLED';
        appointment.cancel();
      } else if (data.status) {
        // Não permitir que usuários alterem outros status diretamente
        throw new InvalidOperationError(
          'Users can only cancel their appointments or update date/time',
        );
      }
    } else if (data.userRole === 'MANAGER') {
      // Manager não pode atualizar agendamentos de outros usuários
      if (appointment.userId !== data.userId) {
        throw new ForbiddenError(
          'Managers cannot update appointments of other users',
        );
      }

      // Manager pode cancelar ou rejeitar seus próprios agendamentos
      if (data.status === 'CANCELLED') {
        changes.status = 'CANCELLED';
        appointment.cancel();
      } else if (data.status === 'REJECTED') {
        changes.status = 'REJECTED';
        appointment.reject();
      } else if (data.status && data.status !== 'PENDING') {
        throw new InvalidOperationError(
          'Managers can only set status to PENDING, CANCELLED or REJECTED',
        );
      } else if (data.status === 'PENDING') {
        changes.status = 'PENDING';
        appointment.updateStatus('PENDING');
      }
    } else if (data.userRole === 'ADMIN') {
      // ADMIN pode fazer qualquer alteração
      if (data.status) {
        changes.status = data.status;
        appointment.updateStatus(data.status);
      }
    }

    // Aplicar mudanças de data/hora se fornecidas
    if (data.date && data.startTime && data.endTime) {
      changes.date = data.date;
      changes.startTime = data.startTime;
      changes.endTime = data.endTime;
      appointment.updateDateTime(data.date, data.startTime, data.endTime);

      // Se for USER, voltar status para PENDING após alterar data/hora
      if (data.userRole === 'USER') {
        changes.status = 'PENDING';
        appointment.updateStatus('PENDING');
      }
    }

    await this.appointmentRepository.update(appointment);

    // Disparar evento de appointment atualizado se eventBus estiver disponível
    if (this.eventBus && Object.keys(changes).length > 0) {
      const appointmentUpdatedEvent = new AppointmentUpdatedEvent(
        appointment,
        data.userId,
        changes,
      );
      await this.eventBus.publish(appointmentUpdatedEvent);
    }

    return appointment;
  }

  private validateUserPermissions(
    userId: string,
    userRole: string,
    appointment: Appointment,
  ): void {
    // Verificações básicas de permissão
    if (!userId || !userRole) {
      throw new ForbiddenError('User authentication required');
    }

    // Verificar se o usuário tem permissão para acessar este agendamento
    if (userRole === 'USER' && appointment.userId !== userId) {
      throw new ForbiddenError('Users can only access their own appointments');
    }
  }
}
