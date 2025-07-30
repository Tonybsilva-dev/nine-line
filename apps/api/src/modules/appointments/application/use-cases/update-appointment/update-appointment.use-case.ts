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
  cancelReason?: string; // Adicionado para armazenar o motivo da cancelação
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

    // Check permissions based on user role
    this.validateUserPermissions(data.userId, data.userRole, appointment);

    const changes: Record<string, unknown> = {};

    // Role-specific logic
    if (data.userRole === 'USER') {
      // User can only update their own appointments
      if (appointment.userId !== data.userId) {
        throw new ForbiddenError(
          'Users can only update their own appointments',
        );
      }
      // User can cancel their own appointment (any status)
      if (data.status === 'CANCELLED') {
        if (!data.cancelReason) {
          throw new InvalidOperationError(
            'Cancel reason is required when cancelling an appointment.',
          );
        }
        changes.status = 'CANCELLED';
        changes.cancelReason = data.cancelReason;
        appointment.cancel();
      } else if (data.status) {
        // Users cannot change other statuses directly
        throw new InvalidOperationError(
          'Users can only cancel their appointments or update date/time',
        );
      }
    } else if (data.userRole === 'MANAGER') {
      // Manager cannot update other users' appointments
      if (appointment.userId !== data.userId) {
        throw new ForbiddenError(
          'Managers cannot update appointments of other users',
        );
      }
      // Manager can cancel or reject their own appointments
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
      // ADMIN can make any change
      if (data.status) {
        changes.status = data.status;
        appointment.updateStatus(data.status);
      }
    }

    // Apply date/time changes if provided
    if (data.date && data.startTime && data.endTime) {
      // Validar regras de negócio para alterações de usuário
      if (data.userRole === 'USER') {
        // Verificar se não excedeu o número máximo de alterações
        if (appointment.changeCount >= appointment.maxChanges) {
          throw new InvalidOperationError(
            `Maximum number of changes (${appointment.maxChanges}) exceeded. Cannot modify appointment anymore.`,
          );
        }

        // Verificar se a nova data não excede 2 meses da data original
        if (appointment.originalDate) {
          const twoMonthsFromOriginal = new Date(appointment.originalDate);
          twoMonthsFromOriginal.setMonth(twoMonthsFromOriginal.getMonth() + 2);

          if (data.date > twoMonthsFromOriginal) {
            throw new InvalidOperationError(
              'Cannot reschedule more than 2 months from the original date.',
            );
          }
        }
      }

      changes.date = data.date;
      changes.startTime = data.startTime;
      changes.endTime = data.endTime;
      appointment.updateDateTime(data.date, data.startTime, data.endTime);
      // If USER, reset status to PENDING after changing date/time
      if (data.userRole === 'USER') {
        changes.status = 'PENDING';
        appointment.updateStatus('PENDING');
      }
    }

    await this.appointmentRepository.update(appointment);

    // Emit appointment updated event if eventBus is available
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
    // Basic permission checks
    if (!userId || !userRole) {
      throw new ForbiddenError('User authentication required');
    }
    // Check if user has permission to access this appointment
    if (userRole === 'USER' && appointment.userId !== userId) {
      throw new ForbiddenError('Users can only access their own appointments');
    }
  }
}
