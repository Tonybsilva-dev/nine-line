import { AuthorizationService } from '../../../domain/services/authorization.service';

interface GetUserPermissionsDTO {
  userId: string;
}

export class GetUserPermissionsUseCase {
  constructor(private readonly authorizationService: AuthorizationService) {}

  async execute(data: GetUserPermissionsDTO): Promise<string[]> {
    return this.authorizationService.getUserPermissions(data.userId);
  }
}
