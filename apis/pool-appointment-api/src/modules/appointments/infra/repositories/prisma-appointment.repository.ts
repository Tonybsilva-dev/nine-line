import {
  PrismaClient,
  AppointmentStatus,
  Appointment as PrismaAppointment,
} from '@prisma/client';
import { AppointmentRepository } from '../../domain/repositories/appointment-repository';
import { Appointment } from '../../domain/entities/appointment';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InvalidOperationError } from '@/core/errors';
import { prisma } from '@/config/prisma';
import { getCache, setCache, deleteCache } from '@/config/redis';

export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(private prisma: PrismaClient) {}

  async create(appointment: Appointment): Promise<void> {
    // Verificar conflitos antes de criar o agendamento
    const conflictingAppointments = await this.findByDateRange(
      appointment.spaceId,
      appointment.startTime,
      appointment.endTime,
    );

    if (conflictingAppointments.length > 0) {
      throw new InvalidOperationError(
        'Já existe um agendamento para este horário neste espaço',
      );
    }

    await prisma.appointment.create({
      data: {
        id: appointment.id.toString(),
        userId: appointment.userId,
        spaceId: appointment.spaceId,
        date: appointment.date,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        status: appointment.status,
        createdAt: appointment.createdAt,
        updatedAt: appointment.updatedAt,
      },
    });
    await deleteCache(`appointment:${appointment.id.toString()}`);
    await this.invalidateAppointmentsCache();
  }

  async findById(id: string): Promise<Appointment | null> {
    const cacheKey = `appointment:${id}`;
    const cached = await getCache<PrismaAppointment>(cacheKey);
    if (cached) {
      return Appointment.create(cached, new UniqueEntityID(cached.id));
    }
    const data = await prisma.appointment.findUnique({ where: { id } });
    if (!data) return null;
    await setCache(cacheKey, data, 300);
    return Appointment.create(data, new UniqueEntityID(data.id));
  }

  async findByUserId(
    userId: string,
    params: PaginationParams,
  ): Promise<{ total: number; appointments: Appointment[] }> {
    const skip = ((params.page ?? 1) - 1) * (params.perPage ?? 10);

    const [appointments, total] = await Promise.all([
      this.prisma.appointment.findMany({
        where: { userId },
        skip,
        take: params.perPage ?? 10,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.appointment.count({
        where: { userId },
      }),
    ]);

    return {
      total,
      appointments: appointments.map((appointment) =>
        Appointment.create(
          {
            userId: appointment.userId,
            spaceId: appointment.spaceId,
            date: appointment.date,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            status: appointment.status,
            createdAt: appointment.createdAt,
            updatedAt: appointment.updatedAt,
          },
          new UniqueEntityID(appointment.id),
        ),
      ),
    };
  }

  async findBySpaceId(
    spaceId: string,
    params: PaginationParams,
  ): Promise<{ total: number; appointments: Appointment[] }> {
    const skip = ((params.page ?? 1) - 1) * (params.perPage ?? 10);

    const [appointments, total] = await Promise.all([
      this.prisma.appointment.findMany({
        where: { spaceId },
        skip,
        take: params.perPage ?? 10,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.appointment.count({
        where: { spaceId },
      }),
    ]);

    return {
      total,
      appointments: appointments.map((appointment) =>
        Appointment.create(
          {
            userId: appointment.userId,
            spaceId: appointment.spaceId,
            date: appointment.date,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            status: appointment.status,
            createdAt: appointment.createdAt,
            updatedAt: appointment.updatedAt,
          },
          new UniqueEntityID(appointment.id),
        ),
      ),
    };
  }

  async findByDateRange(
    spaceId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Appointment[]> {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        spaceId,
        AND: [
          {
            OR: [
              {
                startTime: {
                  gte: startDate,
                  lt: endDate,
                },
              },
              {
                endTime: {
                  gt: startDate,
                  lte: endDate,
                },
              },
              {
                AND: [
                  { startTime: { lte: startDate } },
                  { endTime: { gte: endDate } },
                ],
              },
            ],
          },
          {
            status: {
              not: AppointmentStatus.CANCELLED,
            },
          },
        ],
      },
    });

    return appointments.map((appointment) =>
      Appointment.create(
        {
          userId: appointment.userId,
          spaceId: appointment.spaceId,
          date: appointment.date,
          startTime: appointment.startTime,
          endTime: appointment.endTime,
          status: appointment.status,
          createdAt: appointment.createdAt,
          updatedAt: appointment.updatedAt,
        },
        new UniqueEntityID(appointment.id),
      ),
    );
  }

  async update(appointment: Appointment): Promise<void> {
    await prisma.appointment.update({
      where: { id: appointment.id.toString() },
      data: {
        userId: appointment.userId,
        spaceId: appointment.spaceId,
        date: appointment.date,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        status: appointment.status,
        updatedAt: appointment.updatedAt,
      },
    });
    await deleteCache(`appointment:${appointment.id.toString()}`);
    await this.invalidateAppointmentsCache();
  }

  async delete(id: string): Promise<void> {
    await prisma.appointment.delete({ where: { id } });
    await deleteCache(`appointment:${id}`);
    await this.invalidateAppointmentsCache();
  }

  async count(): Promise<number> {
    return await this.prisma.appointment.count();
  }

  async findAll(
    params: PaginationParams,
  ): Promise<{ total: number; appointments: Appointment[] }> {
    const page = params.page ?? 1;
    const perPage = params.perPage ?? 10;
    const cacheKey = `appointments:page:${page}:perPage:${perPage}`;

    // 1. Tenta buscar no cache
    const cached = await getCache<{
      total: number;
      appointments: PrismaAppointment[];
    }>(cacheKey);
    if (cached) {
      return {
        total: cached.total,
        appointments: cached.appointments.map((appointment) =>
          Appointment.create(
            {
              userId: appointment.userId,
              spaceId: appointment.spaceId,
              date: appointment.date,
              startTime: appointment.startTime,
              endTime: appointment.endTime,
              status: appointment.status,
              createdAt: appointment.createdAt,
              updatedAt: appointment.updatedAt,
            },
            new UniqueEntityID(appointment.id),
          ),
        ),
      };
    }

    // 2. Busca no banco
    const skip = (page - 1) * perPage;
    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.appointment.count(),
    ]);

    // 3. Salva no cache
    await setCache(cacheKey, { total, appointments }, 300);

    return {
      total,
      appointments: appointments.map((appointment) =>
        Appointment.create(
          {
            userId: appointment.userId,
            spaceId: appointment.spaceId,
            date: appointment.date,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            status: appointment.status,
            createdAt: appointment.createdAt,
            updatedAt: appointment.updatedAt,
          },
          new UniqueEntityID(appointment.id),
        ),
      ),
    };
  }

  // Adicione a seguinte função utilitária para invalidar cache de páginas
  private async invalidateAppointmentsCache() {
    // Invalida as primeiras 5 páginas (ajuste conforme necessário)
    for (let page = 1; page <= 5; page++) {
      await deleteCache(`appointments:page:${page}:perPage:10`);
    }
  }
}
