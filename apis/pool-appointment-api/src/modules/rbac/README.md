# Módulo RBAC (Role-Based Access Control)

## Visão Geral

O módulo RBAC implementa um sistema completo de controle de acesso baseado em roles, seguindo o padrão estrito do módulo de users. O sistema permite hierarquia de roles, permissões granulares, cache para performance e auditoria completa.

## Estrutura

```
src/modules/rbac/
├── domain/
│   ├── entities/
│   │   ├── permission.ts          # Entidade de permissão
│   │   ├── role.ts               # Entidade de role com hierarquia
│   │   ├── user-role-assignment.ts # Associação user-role
│   │   ├── permissions.ts        # Constantes de permissões
│   │   └── roles.ts              # Constantes de roles
│   ├── events/
│   │   ├── role-assigned.event.ts
│   │   ├── role-revoked.event.ts
│   │   ├── role-created.event.ts
│   │   └── index.ts
│   ├── repositories/
│   │   ├── permission-repository.ts
│   │   ├── role-repository.ts
│   │   └── user-role-repository.ts
│   └── services/
│       └── authorization.service.ts # Serviço principal com cache
├── application/
│   ├── events/
│   │   ├── role-assigned.handler.ts
│   │   ├── role-revoked.handler.ts
│   │   ├── role-created.handler.ts
│   │   └── index.ts
│   └── use-cases/
│       ├── assign-role/
│       ├── revoke-role/
│       ├── create-role/
│       ├── check-permission/
│       └── get-user-permissions/
└── presentation/
    └── middleware/
        └── authorization.middleware.ts
```

## Hierarquia de Roles

```typescript
ROLE_LEVELS = {
  USER: 0, // Usuário básico
  MANAGER: 1, // Gerente com permissões elevadas
  ADMIN: 2, // Administrador com todas as permissões
};
```

## Permissões Granulares

### Appointments

- `appointment:create` - Criar agendamento
- `appointment:read:own` - Ler próprios agendamentos
- `appointment:read:all` - Ler todos os agendamentos
- `appointment:update:own` - Atualizar próprios agendamentos
- `appointment:update:all` - Atualizar todos os agendamentos
- `appointment:delete:own` - Deletar próprios agendamentos
- `appointment:delete:all` - Deletar todos os agendamentos
- `appointment:approve` - Aprovar agendamentos
- `appointment:reject` - Rejeitar agendamentos
- `appointment:cancel:own` - Cancelar próprios agendamentos
- `appointment:cancel:all` - Cancelar todos os agendamentos

### Users

- `user:create` - Criar usuário
- `user:read:own` - Ler próprio perfil
- `user:read:all` - Ler todos os usuários
- `user:update:own` - Atualizar próprio perfil
- `user:update:all` - Atualizar todos os usuários
- `user:delete` - Deletar usuários
- `user:block` - Bloquear usuários
- `user:unblock` - Desbloquear usuários

### Spaces

- `space:create` - Criar espaço
- `space:read` - Ler espaços
- `space:update:own` - Atualizar próprios espaços
- `space:update:all` - Atualizar todos os espaços
- `space:delete:own` - Deletar próprios espaços
- `space:delete:all` - Deletar todos os espaços

### Ratings

- `rating:create` - Criar avaliação
- `rating:read` - Ler avaliações
- `rating:update:own` - Atualizar próprias avaliações
- `rating:update:all` - Atualizar todas as avaliações
- `rating:delete:own` - Deletar próprias avaliações
- `rating:delete:all` - Deletar todas as avaliações

## Roles Predefinidas

### USER (Nível 0)

- Permissões básicas para criar e gerenciar próprios agendamentos
- Acesso de leitura a espaços
- Capacidade de criar e gerenciar próprias avaliações

### MANAGER (Nível 1)

- Todas as permissões de USER
- Capacidade de aprovar/rejeitar agendamentos
- Acesso de leitura a todos os usuários
- Capacidade de gerenciar avaliações de todos

### ADMIN (Nível 2)

- Todas as permissões do sistema
- Controle total sobre roles e permissões
- Capacidade de gerenciar todos os recursos

## Cache de Performance

O `AuthorizationService` implementa cache de permissões com TTL de 5 minutos para otimizar performance:

```typescript
interface PermissionCache {
  [userId: string]: {
    permissions: string[];
    expiresAt: number;
  };
}
```

## Auditoria

Todos os eventos são registrados com informações completas:

- Quem atribuiu/removeu a role
- Quando a ação foi realizada
- Qual role foi afetada
- Expiração da role (se aplicável)

## Integração com Appointments

Exemplo de uso no módulo de appointments:

```typescript
export class ApproveAppointmentUseCase {
  async execute(data: ApproveAppointmentDTO): Promise<Appointment> {
    // Verificar permissão de aprovação
    await this.authorizationService.requirePermission(
      data.adminId,
      APPOINTMENT_PERMISSIONS.APPROVE,
    );

    // Lógica de aprovação...
  }
}
```

## Middleware de Autorização

```typescript
// Verificar permissão específica
app.get('/appointments', requirePermission('appointment:read:all'));

// Verificar nível de role
app.post('/admin/users', requireRoleLevel(2)); // ADMIN only

// Verificar propriedade do recurso
app.put('/appointments/:id', requireResourceOwnership('appointment', 'id'));
```

## Eventos de Domínio

- `RoleAssignedEvent` - Quando uma role é atribuída
- `RoleRevokedEvent` - Quando uma role é revogada
- `RoleCreatedEvent` - Quando uma nova role é criada

## Benefícios

1. **Segurança**: Controle granular de acesso
2. **Performance**: Cache de permissões
3. **Auditoria**: Rastreamento completo de ações
4. **Flexibilidade**: Hierarquia de roles
5. **Extensibilidade**: Sistema de eventos
6. **Manutenibilidade**: Padrão consistente com outros módulos
