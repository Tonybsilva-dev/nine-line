import { UserRoleRepository } from '../../../domain/repositories/user-role.repository';
import { RoleRepository } from '../../../domain/repositories/role.repository';
import { UserRoleAssignment } from '../../../domain/entities';
import { EventBus } from '@/core/events';
import { RoleAssignedEvent } from '../../../domain/events';
import { EntityNotFoundError } from '@/core/errors';

interface AssignRoleDTO {
  userId: string;
  roleId: string;
  assignedBy: string;
  expiresAt?: Date;
}

export class AssignRoleUseCase {
  constructor(
    private readonly userRoleRepository: UserRoleRepository,
    private readonly roleRepository: RoleRepository,
    private readonly eventBus?: EventBus,
  ) {}

  async execute(data: AssignRoleDTO): Promise<UserRoleAssignment> {
    // Verify role exists
    const role = await this.roleRepository.findById(data.roleId);
    if (!role) {
      throw new EntityNotFoundError('Role', data.roleId);
    }

    // Check if assignment already exists
    const existingAssignments = await this.userRoleRepository.findByUserId(
      data.userId,
    );
    const existingAssignment = existingAssignments.find(
      (ur) => ur.roleId === data.roleId,
    );

    if (existingAssignment) {
      throw new Error('User already has this role assigned');
    }

    const userRole = UserRoleAssignment.create({
      userId: data.userId,
      roleId: data.roleId,
      assignedBy: data.assignedBy,
      expiresAt: data.expiresAt,
    });

    await this.userRoleRepository.create(userRole);

    // Disparar evento de role atribuída se eventBus estiver disponível
    if (this.eventBus) {
      const roleAssignedEvent = new RoleAssignedEvent(
        userRole,
        data.assignedBy,
      );
      await this.eventBus.publish(roleAssignedEvent);
    }

    return userRole;
  }
}
