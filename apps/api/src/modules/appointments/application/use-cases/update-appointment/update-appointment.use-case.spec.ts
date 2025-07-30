import { describe, it, expect, beforeEach } from 'vitest';
import { UpdateAppointmentUseCase } from './update-appointment.use-case';
import { Appointment } from '../../../domain/entities/appointment';
import { InMemoryAppointmentRepository } from '@/test/repositories/in-memory-appointments-repository';
import {
  EntityNotFoundError,
  InvalidOperationError,
  ForbiddenError,
} from '@/core/errors';
import { AppointmentStatus } from '@prisma/client';

describe('UpdateAppointmentUseCase', () => {
  let appointmentRepository: InMemoryAppointmentRepository;
  let useCase: UpdateAppointmentUseCase;

  beforeEach(() => {
    appointmentRepository = new InMemoryAppointmentRepository();
    useCase = new UpdateAppointmentUseCase(appointmentRepository);
  });

  it('should update appointment when user is ADMIN', async () => {
    const appointment = Appointment.create({
      userId: 'user-1',
      spaceId: 'space-1',
      date: new Date('2030-01-01'),
      startTime: new Date('2030-01-01T10:00:00'),
      endTime: new Date('2030-01-01T12:00:00'),
      status: 'PENDING',
    });

    await appointmentRepository.create(appointment);

    const result = await useCase.execute({
      id: appointment.id.toString(),
      date: new Date('2030-01-02'),
      startTime: new Date('2030-01-02T14:00:00'),
      endTime: new Date('2030-01-02T16:00:00'),
      status: 'CONFIRMED',
      userId: 'admin-1',
      userRole: 'ADMIN',
    });

    expect(result.date).toEqual(new Date('2030-01-02'));
    expect(result.status).toBe('CONFIRMED');
  });

  it('should allow USER to update their own appointment and set status to PENDING', async () => {
    const appointment = Appointment.create({
      userId: 'user-1',
      spaceId: 'space-1',
      date: new Date('2030-01-01'),
      startTime: new Date('2030-01-01T10:00:00'),
      endTime: new Date('2030-01-01T12:00:00'),
      status: 'CONFIRMED',
    });

    await appointmentRepository.create(appointment);

    const result = await useCase.execute({
      id: appointment.id.toString(),
      date: new Date('2030-01-02'),
      startTime: new Date('2030-01-02T14:00:00'),
      endTime: new Date('2030-01-02T16:00:00'),
      userId: 'user-1',
      userRole: 'USER',
    });

    expect(result.date).toEqual(new Date('2030-01-02'));
    expect(result.status).toBe('PENDING'); // Deve voltar para PENDING
  });

  it('should not allow USER to update status directly', async () => {
    const appointment = Appointment.create({
      userId: 'user-1',
      spaceId: 'space-1',
      date: new Date('2024-01-01'),
      startTime: new Date('2024-01-01T10:00:00'),
      endTime: new Date('2024-01-01T12:00:00'),
      status: 'PENDING',
    });

    await appointmentRepository.create(appointment);

    await expect(
      useCase.execute({
        id: appointment.id.toString(),
        status: 'CONFIRMED',
        userId: 'user-1',
        userRole: 'USER',
      }),
    ).rejects.toThrow(InvalidOperationError);
  });

  it('should not allow USER to update other users appointments', async () => {
    const appointment = Appointment.create({
      userId: 'user-2',
      spaceId: 'space-1',
      date: new Date('2024-01-01'),
      startTime: new Date('2024-01-01T10:00:00'),
      endTime: new Date('2024-01-01T12:00:00'),
      status: 'PENDING',
    });

    await appointmentRepository.create(appointment);

    await expect(
      useCase.execute({
        id: appointment.id.toString(),
        date: new Date('2024-01-02'),
        startTime: new Date('2024-01-02T14:00:00'),
        endTime: new Date('2024-01-02T16:00:00'),
        userId: 'user-1',
        userRole: 'USER',
      }),
    ).rejects.toThrow(ForbiddenError);
  });

  it('should allow MANAGER to update their own appointment with limited status options', async () => {
    const appointment = Appointment.create({
      userId: 'manager-1',
      spaceId: 'space-1',
      date: new Date('2024-01-01'),
      startTime: new Date('2024-01-01T10:00:00'),
      endTime: new Date('2024-01-01T12:00:00'),
      status: 'PENDING',
    });

    await appointmentRepository.create(appointment);

    const result = await useCase.execute({
      id: appointment.id.toString(),
      status: AppointmentStatus.CANCELLED,
      userId: 'manager-1',
      userRole: 'MANAGER',
    });

    expect(result.status).toBe('CANCELLED');
  });

  it('should not allow MANAGER to set status to CONFIRMED', async () => {
    const appointment = Appointment.create({
      userId: 'manager-1',
      spaceId: 'space-1',
      date: new Date('2024-01-01'),
      startTime: new Date('2024-01-01T10:00:00'),
      endTime: new Date('2024-01-01T12:00:00'),
      status: 'PENDING',
    });

    await appointmentRepository.create(appointment);

    await expect(
      useCase.execute({
        id: appointment.id.toString(),
        status: 'CONFIRMED',
        userId: 'manager-1',
        userRole: 'MANAGER',
      }),
    ).rejects.toThrow(InvalidOperationError);
  });

  it('should not allow MANAGER to update other users appointments', async () => {
    const appointment = Appointment.create({
      userId: 'user-1',
      spaceId: 'space-1',
      date: new Date('2024-01-01'),
      startTime: new Date('2024-01-01T10:00:00'),
      endTime: new Date('2024-01-01T12:00:00'),
      status: 'PENDING',
    });

    await appointmentRepository.create(appointment);

    await expect(
      useCase.execute({
        id: appointment.id.toString(),
        status: AppointmentStatus.CANCELLED,
        userId: 'manager-1',
        userRole: 'MANAGER',
      }),
    ).rejects.toThrow(ForbiddenError);
  });

  it('should allow MANAGER to reject their own appointment', async () => {
    const appointment = Appointment.create({
      userId: 'manager-1',
      spaceId: 'space-1',
      date: new Date('2030-01-01'),
      startTime: new Date('2030-01-01T10:00:00'),
      endTime: new Date('2030-01-01T12:00:00'),
      status: 'PENDING',
    });

    await appointmentRepository.create(appointment);

    const result = await useCase.execute({
      id: appointment.id.toString(),
      status: 'REJECTED',
      userId: 'manager-1',
      userRole: 'MANAGER',
    });

    expect(result.status).toBe('REJECTED');
  });

  it('should allow USER to cancel their own appointment', async () => {
    const appointment = Appointment.create({
      userId: 'user-1',
      spaceId: 'space-1',
      date: new Date('2030-01-01'),
      startTime: new Date('2030-01-01T10:00:00'),
      endTime: new Date('2030-01-01T12:00:00'),
      status: 'CONFIRMED',
    });
    await appointmentRepository.create(appointment);
    const result = await useCase.execute({
      id: appointment.id.toString(),
      status: AppointmentStatus.CANCELLED,
      userId: 'user-1',
      userRole: 'USER',
      cancelReason: 'No longer needed',
    });
    expect(result.status).toBe('CANCELLED');
  });

  it('should not allow USER to reject their own appointment', async () => {
    const appointment = Appointment.create({
      userId: 'user-1',
      spaceId: 'space-1',
      date: new Date('2030-01-01'),
      startTime: new Date('2030-01-01T10:00:00'),
      endTime: new Date('2030-01-01T12:00:00'),
      status: 'PENDING',
    });

    await appointmentRepository.create(appointment);

    await expect(
      useCase.execute({
        id: appointment.id.toString(),
        status: 'REJECTED',
        userId: 'user-1',
        userRole: 'USER',
      }),
    ).rejects.toThrow(InvalidOperationError);
  });

  it('should throw EntityNotFoundError when appointment does not exist', async () => {
    await expect(
      useCase.execute({
        id: 'non-existent-id',
        date: new Date('2024-01-02'),
        startTime: new Date('2024-01-02T14:00:00'),
        endTime: new Date('2024-01-02T16:00:00'),
        userId: 'user-1',
        userRole: 'USER',
      }),
    ).rejects.toThrow(EntityNotFoundError);
  });
});
