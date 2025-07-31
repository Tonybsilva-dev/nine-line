# 📋 Arquitetura do Módulo RBAC

## 🎯 Visão Geral

O módulo `rbac` é responsável por implementar um sistema completo de controle de acesso baseado em roles, incluindo hierarquia de roles, permissões granulares, cache para performance e auditoria completa.

## 🏗️ Estrutura Clean Architecture

```
rbac/
├── domain/                    # Regras de negócio
│   ├── entities/             # Entidades do domínio
│   │   ├── role.ts
│   │   ├── permission.ts
│   │   ├── user-role-assignment.ts
│   │   ├── roles.ts
│   │   ├── permissions.ts
│   │   └── index.ts
│   ├── repositories/         # Interfaces dos repositórios
│   │   ├── role.repository.ts
│   │   ├── permission.repository.ts
│   │   ├── user-role.repository.ts
│   │   └── index.ts
│   ├── services/            # Serviços do domínio
│   │   └── authorization.service.ts
│   └── events/              # Eventos do domínio
│       ├── role-created.event.ts
│       ├── role-assigned.event.ts
│       ├── role-revoked.event.ts
│       └── index.ts
├── application/              # Casos de uso
│   ├── use-cases/
│   │   ├── assign-role/      # Caso de uso de atribuir role
│   │   ├── revoke-role/      # Caso de uso de revogar role
│   │   ├── create-role/      # Caso de uso de criar role
│   │   ├── check-permission/ # Caso de uso de verificar permissão
│   │   ├── get-user-permissions/ # Caso de uso de obter permissões
│   │   └── index.ts
│   └── events/              # Event handlers
│       ├── role-created.handler.ts
│       ├── role-assigned.handler.ts
│       ├── role-revoked.handler.ts
│       └── index.ts
├── presentation/             # Camada de apresentação
│   ├── controllers/         # Controllers HTTP
│   │   ├── assign-role.controller.ts
│   │   ├── revoke-role.controller.ts
│   │   ├── get-roles.controller.ts
│   │   ├── get-user-permissions.controller.ts
│   │   └── index.ts
│   ├── routes/              # Rotas HTTP
│   │   └── rbac.routes.ts
│   ├── validators/          # Validações de entrada
│   │   ├── assign-role.validator.ts
│   │   ├── revoke-role.validator.ts
│   │   ├── get-user-permissions.validator.ts
│   │   └── index.ts
│   ├── middlewares/         # Middlewares específicos
│   │   ├── rbac-rate-limit.middleware.ts
│   │   └── index.ts
│   ├── middleware/          # Middlewares de autorização
│   │   └── authorization.middleware.ts
│   ├── docs/                # Documentação Swagger
│   │   ├── assign-role.doc.ts
│   │   ├── revoke-role.doc.ts
│   │   ├── get-roles.doc.ts
│   │   ├── get-user-permissions.doc.ts
│   │   └── index.ts
│   └── index.ts
└── infra/                   # Implementações externas
    ├── repositories/        # Implementações dos repositórios
    │   ├── prisma-role.repository.ts
    │   ├── prisma-permission.repository.ts
    │   ├── prisma-user-role.repository.ts
    │   └── index.ts
    ├── services/
    └── seeders/
```

## 🔄 Fluxo de Dados

### 1. Atribuição de Role

```
Request → Validator → Rate Limit → Controller → Use Case → Repository → Event → Handler → Response
```

### 2. Verificação de Permissão

```
Request → Auth → Permission Check → Controller → Use Case → Service → Cache → Response
```

### 3. Event-Driven Operations

```
Domain Event → Event Handler → Use Case → Repository → Service → Log
```

## 🎯 Responsabilidades por Camada

### Domain

- **Entities**: Regras de negócio dos roles e permissões
- **Repositories**: Interfaces para acesso a dados
- **Services**: Lógica de autorização com cache
- **Events**: Eventos do domínio (created, assigned, revoked)

### Application

- **Use Cases**: Lógica de aplicação (assign, revoke, check permissions)
- **Events**: Handlers de eventos para auditoria e cache

### Presentation

- **Controllers**: Endpoints HTTP
- **Routes**: Definição de rotas com middlewares
- **Validators**: Validação de entrada com Zod
- **Middlewares**: Rate limiting e autorização
- **Docs**: Documentação Swagger

### Infrastructure

- **Repositories**: Implementação Prisma
- **Services**: Implementações externas

## 🔒 Segurança

### Rate Limiting

- **Assign Role**: 5 requests por minuto por IP
- **Revoke Role**: 5 requests por minuto por IP
- **Middleware**: `rbacRateLimit`

### Autorização

- **Assign Role**: `rbac:assign` (administrador)
- **Revoke Role**: `rbac:revoke` (administrador)
- **Get Roles**: `rbac:read` (autenticado)
- **Get User Permissions**: `rbac:read` (autenticado)

### Validações

- **Assign Role**: userId, roleId, assignedBy
- **Revoke Role**: userId, roleId, revokedBy
- **Get User Permissions**: userId

### Middlewares de Segurança

- **authorization.middleware**: Verifica permissões
- **rbac-rate-limit**: Rate limiting específico para RBAC

## 📊 Métricas

### Logs Estruturados

- `role_assigned`
- `role_revoked`
- `role_created`
- `permission_checked`
- `rate_limit_exceeded`
- `validation_failed`

## 🧪 Testes

### Cobertura

- ✅ Use Cases
- ✅ Controllers
- ✅ Validators
- ❌ Middlewares (pendente)
- ❌ Repositories (pendente)

## 🔧 Configuração

### Variáveis de Ambiente

```env
RBAC_CACHE_TTL=300
RBAC_RATE_LIMIT_ASSIGN=5
RBAC_RATE_LIMIT_REVOKE=5
RBAC_RATE_LIMIT_WINDOW=60000
```

## 📈 Monitoramento

### Health Checks

- ✅ Authorization service
- ✅ Database connectivity
- ✅ Permission cache

### Alertas

- ❌ Failed role operations
- ❌ Rate limit exceeded
- ❌ Permission check errors

## 🚀 Deploy

### Dependências

- PostgreSQL (roles, permissions, user_roles)
- Redis (permission cache)

### Migrations

- ✅ Roles table
- ✅ Permissions table
- ✅ User roles table

## 🎯 Eventos

### RoleAssignedEvent

- Dispara notificação para usuário
- Cria registro de auditoria
- Invalida cache de permissões
- Logs estruturados

### RoleRevokedEvent

- Dispara notificação para usuário
- Registra auditoria
- Invalida cache de permissões
- Logs estruturados

### RoleCreatedEvent

- Registra auditoria
- Logs estruturados

## 🔄 Integrações

### Módulo Users

- Validação de usuário
- Verificação de status

### Módulo Auth

- Middleware de autenticação
- Verificação de tokens

### Módulo Notifications

- Notificações de mudanças de role
- Alertas de segurança

### Cache System

- Cache de permissões
- Invalidação automática

---

_Última atualização: $(date)_
_Versão: 1.0_
