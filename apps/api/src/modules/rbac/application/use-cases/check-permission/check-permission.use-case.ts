import { AuthorizationService } from '../../../domain/services/authorization.service';

interface CheckPermissionDTO {
  userId: string;
  permission: string;
  resourceId?: string;
}

export class CheckPermissionUseCase {
  constructor(private readonly authorizationService: AuthorizationService) {}

  async execute(data: CheckPermissionDTO): Promise<boolean> {
    return this.authorizationService.hasPermission(
      data.userId,
      data.permission,
    );
  }
}
