import { CreateUserUseCase } from '@/modules/users/application/use-cases/create-user/create-user.use-case';
import { PrismaUserRepository } from '@/modules/users/infra/repositories/prisma-user.repository';
import { UserRole, UserStatus } from '@prisma/client';
import { eventBus } from '@/core/events';
import { configureUserEvents } from '@/modules/users/application/events/user-events.config';

async function main() {
  const userRepository = new PrismaUserRepository();
  configureUserEvents(eventBus);

  const users = [
    {
      name: 'Default User',
      email: 'user@default.com',
      password: 'user123',
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
    },
    {
      name: 'Default Manager',
      email: 'manager@default.com',
      password: 'manager123',
      role: UserRole.MANAGER,
      status: UserStatus.ACTIVE,
    },
    {
      name: 'Default Admin',
      email: 'admin@default.com',
      password: 'admin123',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
    },
  ];

  const useCase = new CreateUserUseCase(userRepository, eventBus);

  for (const userData of users) {
    try {
      await useCase.execute(userData);
      console.log(`User ${userData.role} created: ${userData.email}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (
        e.code === 'DUPLICATE_ENTITY' ||
        e.message?.includes('already exists')
      ) {
        console.log(`User ${userData.email} already exists, ignoring...`);
        process.exit(0);
      } else {
        console.error(e);
        process.exit(1);
      }
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
