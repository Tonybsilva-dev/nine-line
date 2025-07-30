import { prisma } from '@/config/prisma';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { Role } from '../../domain/entities/role';
import { RoleRepository } from '../../domain/repositories/role.repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Permission } from '../../domain/entities/permission';

export class PrismaRoleRepository implements RoleRepository {
  async create(role: Role): Promise<void> {
    await prisma.role.create({
      data: {
        id: role.id.toString(),
        name: role.name,
        description: role.description,
        level: role.level,
        isSystem: role.isSystem,
        createdAt: role.createdAt,
        updatedAt: role.updatedAt,
      },
    });
  }

  async findById(id: string): Promise<Role | null> {
    const data = await prisma.role.findUnique({
      where: { id },
      include: {
        rolePermissions: {
          include: { permission: true },
        },
      },
    });
    if (!data) return null;

    const permissions = data.rolePermissions.map((rp) =>
      Permission.create(
        {
          name: rp.permission.name,
          description: rp.permission.description,
          resource: rp.permission.resource,
          action: rp.permission.action,
          createdAt: rp.permission.createdAt,
          updatedAt: rp.permission.updatedAt,
        },
        new UniqueEntityID(rp.permission.id),
      ),
    );

    return Role.create(
      {
        name: data.name,
        description: data.description,
        level: data.level,
        isSystem: data.isSystem,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        permissions,
      },
      new UniqueEntityID(data.id),
    );
  }

  async findByName(name: string): Promise<Role | null> {
    const data = await prisma.role.findUnique({
      where: { name },
      include: {
        rolePermissions: {
          include: { permission: true },
        },
      },
    });
    if (!data) return null;

    const permissions = data.rolePermissions.map((rp) =>
      Permission.create(
        {
          name: rp.permission.name,
          description: rp.permission.description,
          resource: rp.permission.resource,
          action: rp.permission.action,
          createdAt: rp.permission.createdAt,
          updatedAt: rp.permission.updatedAt,
        },
        new UniqueEntityID(rp.permission.id),
      ),
    );

    return Role.create(
      {
        name: data.name,
        description: data.description,
        level: data.level,
        isSystem: data.isSystem,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        permissions,
      },
      new UniqueEntityID(data.id),
    );
  }

  async findAll({
    page = 1,
    perPage = 10,
  }: PaginationParams): Promise<{ total: number; roles: Role[] }> {
    const skip = (page - 1) * perPage;

    const [total, data] = await Promise.all([
      prisma.role.count(),
      prisma.role.findMany({
        skip,
        take: perPage,
        orderBy: { level: 'asc' },
      }),
    ]);

    const roles = data.map((item) =>
      Role.create(
        {
          name: item.name,
          description: item.description,
          level: item.level,
          isSystem: item.isSystem,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        },
        new UniqueEntityID(item.id),
      ),
    );

    return { total, roles };
  }

  async update(role: Role): Promise<void> {
    await prisma.role.update({
      where: { id: role.id.toString() },
      data: {
        name: role.name,
        description: role.description,
        level: role.level,
        isSystem: role.isSystem,
        updatedAt: role.updatedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.role.delete({ where: { id } });
  }

  async count(): Promise<number> {
    return prisma.role.count();
  }

  async findByLevel(level: number): Promise<Role[]> {
    const data = await prisma.role.findMany({
      where: { level },
      orderBy: { name: 'asc' },
    });

    return data.map((item) =>
      Role.create(
        {
          name: item.name,
          description: item.description,
          level: item.level,
          isSystem: item.isSystem,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        },
        new UniqueEntityID(item.id),
      ),
    );
  }
}
