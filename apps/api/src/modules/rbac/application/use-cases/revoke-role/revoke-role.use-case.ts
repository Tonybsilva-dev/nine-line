import { UserRoleRepository } from '../../../domain/repositories/user-role.repository';
import { RoleRepository } from '../../../domain/repositories/role.repository';
import { EventBus } from '@/core/events';
import { RoleRevokedEvent } from '../../../domain/events';
import { EntityNotFoundError } from '@/core/errors';

interface RevokeRoleDTO {
  userId: string;
  roleId: string;
  revokedBy: string;
}

export class RevokeRoleUseCase {
  constructor(
    private readonly userRoleRepository: UserRoleRepository,
    private readonly roleRepository: RoleRepository,
    private readonly eventBus?: EventBus,
  ) {}

  async execute(data: RevokeRoleDTO): Promise<void> {
    // Verify role exists
    const role = await this.roleRepository.findById(data.roleId);
    if (!role) {
      throw new EntityNotFoundError('Role', data.roleId);
    }

    // Check if assignment exists
    const existingAssignments = await this.userRoleRepository.findByUserId(
      data.userId,
    );
    const existingAssignment = existingAssignments.find(
      (ur) => ur.roleId === data.roleId,
    );

    if (!existingAssignment) {
      throw new EntityNotFoundError(
        'UserRoleAssignment',
        `${data.userId}-${data.roleId}`,
      );
    }

    await this.userRoleRepository.deleteByUserIdAndRoleId(
      data.userId,
      data.roleId,
    );

    // Disparar evento de role revogada se eventBus estiver disponível
    if (this.eventBus) {
      const roleRevokedEvent = new RoleRevokedEvent(
        existingAssignment,
        data.revokedBy,
      );
      await this.eventBus.publish(roleRevokedEvent);
    }
  }
}
