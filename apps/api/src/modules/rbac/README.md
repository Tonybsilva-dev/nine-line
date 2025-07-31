# Módulo RBAC (Role-Based Access Control)

Este módulo implementa um sistema completo de controle de acesso baseado em roles, seguindo o padrão estrito dos outros módulos. O sistema permite hierarquia de roles, permissões granulares, cache para performance e auditoria completa.

## 🎯 Funcionalidade Principal

**Sistema completo de controle de acesso** com hierarquia de roles, permissões granulares, cache para performance e auditoria completa.

## 📁 Estrutura do Módulo (Padronizada)

```
rbac/
├── domain/
│   ├── entities/
│   │   ├── permission.ts          # Entidade de permissão
│   │   ├── role.ts               # Entidade de role com hierarquia
│   │   ├── user-role-assignment.ts # Associação usuário-role
│   │   ├── permissions.ts        # Constantes de permissões
│   │   ├── roles.ts              # Constantes de roles
│   │   └── index.ts
│   ├── events/
│   │   ├── role-assigned.event.ts
│   │   ├── role-revoked.event.ts
│   │   ├── role-created.event.ts
│   │   └── index.ts
│   ├── repositories/
│   │   ├── permission-repository.ts
│   │   ├── role-repository.ts
│   │   ├── user-role-repository.ts
│   │   └── index.ts
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
│       ├── get-user-permissions/
│       └── index.ts
├── presentation/
│   ├── controllers/
│   │   ├── assign-role.controller.ts
│   │   ├── revoke-role.controller.ts
│   │   ├── get-roles.controller.ts
│   │   ├── get-user-permissions.controller.ts
│   │   └── index.ts
│   ├── routes/
│   │   └── rbac.routes.ts
│   ├── validators/
│   │   ├── assign-role.validator.ts
│   │   ├── revoke-role.validator.ts
│   │   ├── get-user-permissions.validator.ts
│   │   └── index.ts
│   ├── middlewares/
│   │   ├── rbac-rate-limit.middleware.ts
│   │   └── index.ts
│   ├── middleware/
│   │   └── authorization.middleware.ts
│   ├── docs/
│   │   ├── assign-role.doc.ts
│   │   ├── revoke-role.doc.ts
│   │   ├── get-roles.doc.ts
│   │   ├── get-user-permissions.doc.ts
│   │   └── index.ts
│   └── index.ts
└── infra/
    ├── repositories/
    │   ├── prisma-permission.repository.ts
    │   ├── prisma-role.repository.ts
    │   ├── prisma-user-role.repository.ts
    │   └── index.ts
    ├── services/
    └── seeders/
```

## 🔒 Segurança Implementada

### Rate Limiting

- **Assign Role**: 5 requests por minuto por IP
- **Revoke Role**: 5 requests por minuto por IP
- **Middleware**: `rbacRateLimit`

### Validações

- ✅ **Assign Role**: Validação de userId, roleId, assignedBy
- ✅ **Revoke Role**: Validação de userId, roleId, revokedBy
- ✅ **Get User Permissions**: Validação de userId

### Autorização

- **Assign Role**: `rbac:assign` (administrador)
- **Revoke Role**: `rbac:revoke` (administrador)
- **Get Roles**: `rbac:read` (autenticado)
- **Get User Permissions**: `rbac:read` (autenticado)

### Middlewares de Segurança

- **authorization.middleware**: Verifica permissões
- **rbac-rate-limit**: Rate limiting específico para RBAC

## 🏗️ Hierarquia de Roles

```typescript
ROLE_LEVELS = {
  USER: 0, // Usuário básico
  MANAGER: 1, // Gerente com permissões elevadas
  ADMIN: 2, // Administrador com todas as permissões
};
```

## 🔐 Permissões Granulares

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

## ⚙️ Configuração

### Variáveis de Ambiente

```env
# RBAC
RBAC_CACHE_TTL=300
RBAC_RATE_LIMIT_ASSIGN=5
RBAC_RATE_LIMIT_REVOKE=5
RBAC_RATE_LIMIT_WINDOW=60000
```

### Configuração de Eventos

```typescript
// ✅ Simples e direto
import { configureRbacEvents } from '@/modules/rbac';

configureRbacEvents(eventBus);
```

## 🎯 Handlers Disponíveis

### RoleAssignedHandler ✅

- **Função**: Processa eventos quando role é atribuído
- **Ações**: Logs, auditoria, cache invalidation

### RoleRevokedHandler

- **Função**: Processa eventos quando role é revogado
- **Ações**: Logs, auditoria, cache invalidation

### RoleCreatedHandler

- **Função**: Processa eventos quando role é criado
- **Ações**: Logs, auditoria, cache invalidation

## 📊 Endpoints Disponíveis

### POST /rbac/assign-role

- **Função**: Atribuir role a usuário
- **Validação**: userId, roleId, assignedBy
- **Rate Limit**: 5 requests/minuto
- **Autenticação**: Obrigatória

### GET /rbac/roles

- **Função**: Listar todos os roles
- **Autenticação**: Obrigatória

### POST /rbac/revoke-role

- **Função**: Revogar role de usuário
- **Validação**: userId, roleId, revokedBy
- **Rate Limit**: 5 requests/minuto
- **Autenticação**: Obrigatória

### GET /rbac/user-permissions/:userId

- **Função**: Obter permissões de usuário
- **Validação**: userId
- **Autenticação**: Obrigatória

## 🗄️ Banco de Dados

### Tabelas

- **roles**: Roles do sistema
- **permissions**: Permissões do sistema
- **user_roles**: Associações usuário-role

### Relacionamentos

- `Role` → `Permission` (many-to-many)
- `User` → `Role` (many-to-many via user_roles)

## 🎯 Eventos Integrados

### RoleAssignedEvent ✅

- ✅ Dispara notificação para usuário
- ✅ Cria registro de auditoria
- ✅ Logs estruturados

### RoleRevokedEvent

- ✅ Dispara notificação para usuário
- ✅ Registra auditoria
- ✅ Logs estruturados

### RoleCreatedEvent

- ✅ Registra auditoria
- ✅ Logs estruturados

## 🔍 Troubleshooting

### Role não encontrado

- Verificar se o roleId é um UUID válido
- Verificar se o role existe no sistema
- Verificar logs de auditoria

### Permissão negada

- Verificar se o usuário tem a permissão necessária
- Verificar se o role tem a permissão
- Verificar hierarquia de roles
- Verificar logs de auditoria

### Rate Limit Exceeded

- Verificar se o IP não excedeu o limite
- Aguardar o reset da janela de tempo
- Verificar logs de rate limiting

### Validação falhou

- Verificar se todos os UUIDs são válidos
- Verificar se os campos obrigatórios estão presentes
- Verificar se os IDs existem no sistema

## 📈 Logs

Todos os handlers registram logs estruturados:

```typescript
logger.info({
  type: 'role_assigned_handler',
  eventId: event.eventId,
  userId: event.userId.toString(),
  roleId: event.roleId.toString(),
});
```

## ✅ Como Funciona

1. **Role é atribuído** → `RoleAssignedEvent` é disparado
2. **RoleAssignedHandler** é executado
3. **Notificação é enviada** para o usuário
4. **Auditoria é registrada** no banco de dados
5. **Cache é invalidado** para performance
6. **Logs são estruturados** para monitoramento

**Resultado**: Role atribuído com todas as validações e eventos! 🎉

## 📋 Status de Padronização

### ✅ Implementado

- ✅ Estrutura Clean Architecture completa
- ✅ README.md detalhado
- ✅ index.ts com exports organizados
- ✅ Validações para todos os endpoints
- ✅ Middleware de rate limiting
- ✅ Documentação Swagger
- ✅ Logs estruturados
- ✅ Middlewares de segurança
- ✅ Cache para performance

### 🎯 Próximos Passos

- Implementar testes para middlewares
- Implementar testes para use cases
- Adicionar métricas de monitoramento
- Implementar cache distribuído

---

_Última atualização: $(date)_
_Versão: 1.0 - Padronizado_
