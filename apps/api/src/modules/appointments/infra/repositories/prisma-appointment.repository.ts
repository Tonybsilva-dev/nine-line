import {
  PrismaClient,
  AppointmentStatus,
  Appointment as PrismaAppointment,
  Prisma,
} from '@prisma/client';
import { AppointmentRepository } from '../../domain/repositories/appointment-repository';
import { Appointment } from '../../domain/entities/appointment';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InvalidOperationError } from '@/core/errors';
import { prisma } from '@/config/prisma';
import { getCache, setCache, deleteCache } from '@/config/redis.config';

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
        originalDate: appointment.originalDate || appointment.date,
        changeCount: appointment.changeCount,
        maxChanges: appointment.maxChanges,
      },
    });
    await deleteCache(`appointment:${appointment.id.toString()}`);
    await this.invalidateAppointmentsCache();
  }

  async findById(id: string): Promise<Appointment | null> {
    const cacheKey = `appointment:${id}`;
    const cached = await getCache<PrismaAppointment>(cacheKey);
    if (cached) {
      const { id: cachedId, ...appointmentData } = cached;
      return Appointment.create(
        {
          ...appointmentData,
          cancelReason: cached.cancelReason || undefined,
          originalDate: cached.originalDate || undefined,
        },
        new UniqueEntityID(cachedId),
      );
    }
    const data = await prisma.appointment.findUnique({ where: { id } });
    if (!data) return null;
    await setCache(cacheKey, data, 300);
    const { id: dataId, ...appointmentData } = data;
    return Appointment.create(
      {
        ...appointmentData,
        cancelReason: data.cancelReason || undefined,
        originalDate: data.originalDate || undefined,
      },
      new UniqueEntityID(dataId),
    );
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
        cancelReason: appointment.cancelReason,
        originalDate: appointment.originalDate,
        changeCount: appointment.changeCount,
        maxChanges: appointment.maxChanges,
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
    params: PaginationParams & { hostId?: string; userRole?: string },
  ): Promise<{ total: number; appointments: Appointment[] }> {
    const page = params.page ?? 1;
    const perPage = params.perPage ?? 10;
    const cacheKey = `appointments:page:${page}:perPage:${perPage}:hostId:${params.hostId ?? 'all'}`;

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
    const where: Prisma.AppointmentWhereInput = {};
    if (params.hostId && params.userRole === 'MANAGER') {
      // Buscar apenas appointments dos espaços onde o hostId é igual ao userId do manager
      const spaces = await this.prisma.space.findMany({
        where: { hostId: params.hostId },
        select: { id: true },
      });
      const spaceIds = spaces.map((s) => s.id);
      where.spaceId = { in: spaceIds };
    }
    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.appointment.count({ where }),
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
