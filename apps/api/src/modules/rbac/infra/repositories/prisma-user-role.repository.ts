import { prisma } from '@/config/prisma';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { UserRoleAssignment } from '../../domain/entities/user-role-assignment';
import { UserRoleRepository } from '../../domain/repositories/user-role.repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export class PrismaUserRoleRepository implements UserRoleRepository {
  async create(userRole: UserRoleAssignment): Promise<void> {
    await prisma.userRoleAssignment.create({
      data: {
        id: userRole.id.toString(),
        userId: userRole.userId,
        roleId: userRole.roleId,
        assignedBy: userRole.assignedBy,
        assignedAt: userRole.assignedAt,
        expiresAt: userRole.expiresAt,
      },
    });
  }

  async findById(id: string): Promise<UserRoleAssignment | null> {
    const data = await prisma.userRoleAssignment.findUnique({ where: { id } });
    if (!data) return null;

    return UserRoleAssignment.create(
      {
        userId: data.userId,
        roleId: data.roleId,
        assignedBy: data.assignedBy || undefined,
        assignedAt: data.assignedAt,
        expiresAt: data.expiresAt || undefined,
      },
      new UniqueEntityID(data.id),
    );
  }

  async findByUserId(userId: string): Promise<UserRoleAssignment[]> {
    const data = await prisma.userRoleAssignment.findMany({
      where: { userId },
      include: { role: true },
    });

    return data.map((item) =>
      UserRoleAssignment.create(
        {
          userId: item.userId,
          roleId: item.roleId,
          assignedBy: item.assignedBy || undefined,
          assignedAt: item.assignedAt,
          expiresAt: item.expiresAt || undefined,
        },
        new UniqueEntityID(item.id),
      ),
    );
  }

  async findByRoleId(roleId: string): Promise<UserRoleAssignment[]> {
    const data = await prisma.userRoleAssignment.findMany({
      where: { roleId },
    });

    return data.map((item) =>
      UserRoleAssignment.create(
        {
          userId: item.userId,
          roleId: item.roleId,
          assignedBy: item.assignedBy || undefined,
          assignedAt: item.assignedAt,
          expiresAt: item.expiresAt || undefined,
        },
        new UniqueEntityID(item.id),
      ),
    );
  }

  async findActiveByUserId(userId: string): Promise<UserRoleAssignment[]> {
    const now = new Date();
    const data = await prisma.userRoleAssignment.findMany({
      where: {
        userId,
        OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
      },
    });

    return data.map((item) =>
      UserRoleAssignment.create(
        {
          userId: item.userId,
          roleId: item.roleId,
          assignedBy: item.assignedBy || undefined,
          assignedAt: item.assignedAt,
          expiresAt: item.expiresAt || undefined,
        },
        new UniqueEntityID(item.id),
      ),
    );
  }

  async findAll({ page = 1, perPage = 10 }: PaginationParams): Promise<{
    total: number;
    userRoles: UserRoleAssignment[];
  }> {
    const skip = (page - 1) * perPage;

    const [total, data] = await Promise.all([
      prisma.userRoleAssignment.count(),
      prisma.userRoleAssignment.findMany({
        skip,
        take: perPage,
        orderBy: { assignedAt: 'desc' },
      }),
    ]);

    const userRoles = data.map((item) =>
      UserRoleAssignment.create(
        {
          userId: item.userId,
          roleId: item.roleId,
          assignedBy: item.assignedBy || undefined,
          assignedAt: item.assignedAt,
          expiresAt: item.expiresAt || undefined,
        },
        new UniqueEntityID(item.id),
      ),
    );

    return { total, userRoles };
  }

  async delete(id: string): Promise<void> {
    await prisma.userRoleAssignment.delete({ where: { id } });
  }

  async deleteByUserIdAndRoleId(userId: string, roleId: string): Promise<void> {
    await prisma.userRoleAssignment.deleteMany({
      where: { userId, roleId },
    });
  }

  async count(): Promise<number> {
    return prisma.userRoleAssignment.count();
  }

  async update(userRole: UserRoleAssignment): Promise<void> {
    await prisma.userRoleAssignment.update({
      where: { id: userRole.id.toString() },
      data: {
        userId: userRole.userId,
        roleId: userRole.roleId,
        assignedBy: userRole.assignedBy || undefined,
        assignedAt: userRole.assignedAt,
        expiresAt: userRole.expiresAt || undefined,
      },
    });
  }

  async countByUserId(userId: string): Promise<number> {
    return prisma.userRoleAssignment.count({
      where: { userId },
    });
  }
}
