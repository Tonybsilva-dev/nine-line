import { describe, it, expect, beforeEach } from 'vitest';
import { DeleteAppointmentUseCase } from './delete-appointment.use-case';
import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointments-repository';
import { makeAppointment } from 'test/factories/make-appointment';
import { AppointmentStatus } from '@prisma/client';

describe('DeleteAppointmentUseCase', () => {
  let appointmentRepository: InMemoryAppointmentRepository;
  let deleteAppointmentUseCase: DeleteAppointmentUseCase;

  beforeEach(() => {
    appointmentRepository = new InMemoryAppointmentRepository();
    deleteAppointmentUseCase = new DeleteAppointmentUseCase(
      appointmentRepository,
    );
  });

  it('should delete an appointment', async () => {
    const appointment = makeAppointment();
    await appointmentRepository.create(appointment);

    await deleteAppointmentUseCase.execute(appointment.id.toString());

    const deletedAppointment = await appointmentRepository.findById(
      appointment.id.toString(),
    );
    expect(deletedAppointment).toBeNull();

    const total = await appointmentRepository.count();
    expect(total).toBe(0);
  });

  it('should throw error when appointment not found', async () => {
    await expect(() =>
      deleteAppointmentUseCase.execute('non-existent-id'),
    ).rejects.toThrow(
      "Appointment with identifier 'non-existent-id' not found",
    );
  });

  it('should delete appointment with different statuses', async () => {
    const pendingAppointment = makeAppointment({
      status: AppointmentStatus.PENDING,
    });
    const confirmedAppointment = makeAppointment({
      status: AppointmentStatus.CONFIRMED,
    });
    const cancelledAppointment = makeAppointment({
      status: AppointmentStatus.CANCELLED,
    });

    await appointmentRepository.create(pendingAppointment);
    await appointmentRepository.create(confirmedAppointment);
    await appointmentRepository.create(cancelledAppointment);

    await deleteAppointmentUseCase.execute(pendingAppointment.id.toString());
    await deleteAppointmentUseCase.execute(confirmedAppointment.id.toString());
    await deleteAppointmentUseCase.execute(cancelledAppointment.id.toString());

    const total = await appointmentRepository.count();
    expect(total).toBe(0);
  });

  it('should delete multiple appointments', async () => {
    const appointments = [
      makeAppointment({
        id: 'appointment-1',
        status: AppointmentStatus.PENDING,
      }),
      makeAppointment({
        id: 'appointment-2',
        status: AppointmentStatus.CONFIRMED,
      }),
      makeAppointment({
        id: 'appointment-3',
        status: AppointmentStatus.CANCELLED,
      }),
      makeAppointment({
        id: 'appointment-4',
        status: AppointmentStatus.REJECTED,
      }),
    ];

    await appointmentRepository.create(appointments[0]);
    await appointmentRepository.create(appointments[1]);
    await appointmentRepository.create(appointments[2]);
    await appointmentRepository.create(appointments[3]);

    expect(await appointmentRepository.count()).toBe(4);

    await deleteAppointmentUseCase.execute(appointments[0].id.toString());
    await deleteAppointmentUseCase.execute(appointments[1].id.toString());

    expect(await appointmentRepository.count()).toBe(2);

    const remainingAppointment = await appointmentRepository.findById(
      appointments[3].id.toString(),
    );
    expect(remainingAppointment).toBeDefined();
    expect(remainingAppointment?.id.toString()).toBe(
      appointments[3].id.toString(),
    );
  });
});
