import { prisma } from '@/config/prisma';
import { logger } from '@/config/logger';

export class AssignRolesToUsersSeeder {
  static async seed(): Promise<void> {
    logger.info('Starting to assign roles to existing users...');

    try {
      // Buscar todos os usuários
      const users = await prisma.user.findMany({
        where: {
          status: 'ACTIVE',
          deletedAt: null,
        },
      });

      logger.info(`Found ${users.length} active users`);

      for (const user of users) {
        try {
          // Verificar se o usuário já tem role assignment
          const existingAssignment = await prisma.userRoleAssignment.findFirst({
            where: {
              userId: user.id,
            },
          });

          if (existingAssignment) {
            logger.info(
              `User ${user.email} already has role assignment, skipping...`,
            );
            continue;
          }

          // Buscar a role correspondente
          const role = await prisma.role.findUnique({
            where: { name: user.role },
          });

          if (!role) {
            logger.error(`Role ${user.role} not found for user ${user.email}`);
            continue;
          }

          // Criar assignment
          await prisma.userRoleAssignment.create({
            data: {
              userId: user.id,
              roleId: role.id,
              assignedBy: user.id, // Auto-assigned
            },
          });

          logger.info(`Role ${user.role} assigned to user ${user.email}`);
        } catch (error) {
          logger.error(`Error assigning role to user ${user.email}:`, error);
        }
      }

      logger.info('Finished assigning roles to users');
    } catch (error) {
      logger.error('Error in AssignRolesToUsersSeeder:', error);
      throw error;
    }
  }
}

// Executar se for chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  AssignRolesToUsersSeeder.seed()
    .then(() => {
      logger.info('Seeder completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Seeder failed:', error);
      process.exit(1);
    });
}
