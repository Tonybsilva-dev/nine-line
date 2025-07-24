import { prisma } from '@/config/prisma';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { Permission } from '../../domain/entities/permission';
import { PermissionRepository } from '../../domain/repositories/permission.repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export class PrismaPermissionRepository implements PermissionRepository {
  async create(permission: Permission): Promise<void> {
    await prisma.permission.create({
      data: {
        id: permission.id.toString(),
        name: permission.name,
        description: permission.description,
        resource: permission.resource,
        action: permission.action,
        createdAt: permission.createdAt,
        updatedAt: permission.updatedAt,
      },
    });
  }

  async findById(id: string): Promise<Permission | null> {
    const data = await prisma.permission.findUnique({ where: { id } });
    if (!data) return null;

    return Permission.create(
      {
        name: data.name,
        description: data.description,
        resource: data.resource,
        action: data.action,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      new UniqueEntityID(data.id),
    );
  }

  async findByName(name: string): Promise<Permission | null> {
    const data = await prisma.permission.findUnique({ where: { name } });
    if (!data) return null;

    return Permission.create(
      {
        name: data.name,
        description: data.description,
        resource: data.resource,
        action: data.action,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      new UniqueEntityID(data.id),
    );
  }

  async findAll({
    page = 1,
    perPage = 10,
  }: PaginationParams): Promise<{ total: number; permissions: Permission[] }> {
    const skip = (page - 1) * perPage;

    const [total, data] = await Promise.all([
      prisma.permission.count(),
      prisma.permission.findMany({
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const permissions = data.map((item) =>
      Permission.create(
        {
          name: item.name,
          description: item.description,
          resource: item.resource,
          action: item.action,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        },
        new UniqueEntityID(item.id),
      ),
    );

    return { total, permissions };
  }

  async update(permission: Permission): Promise<void> {
    await prisma.permission.update({
      where: { id: permission.id.toString() },
      data: {
        name: permission.name,
        description: permission.description,
        resource: permission.resource,
        action: permission.action,
        updatedAt: permission.updatedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.permission.delete({ where: { id } });
  }

  async count(): Promise<number> {
    return prisma.permission.count();
  }
}
