# 📋 Arquitetura do Módulo Users

## 🎯 Visão Geral

O módulo `users` é responsável por gerenciar os usuários da aplicação, incluindo criação, atualização, exclusão e consulta de usuários com controle de acesso baseado em roles.

## 🏗️ Estrutura Clean Architecture

```
users/
├── domain/                    # Regras de negócio
│   ├── entities/             # Entidades do domínio
│   │   ├── user.ts
│   │   ├── value-objects/
│   │   │   └── password.ts
│   │   └── index.ts
│   ├── repositories/         # Interfaces dos repositórios
│   │   └── user.repository.ts
│   └── events/              # Eventos do domínio
│       ├── user-created.event.ts
│       ├── user-updated.event.ts
│       ├── user-deleted.event.ts
│       └── index.ts
├── application/              # Casos de uso
│   ├── use-cases/
│   │   ├── create-user/
│   │   ├── update-user/
│   │   ├── delete-user/
│   │   ├── find-user/
│   │   ├── count/
│   │   └── index.ts
│   └── events/              # Event handlers
│       ├── user-created.handler.ts
│       ├── user-updated.handler.ts
│       ├── user-deleted.handler.ts
│       ├── user-events.config.ts
│       └── index.ts
├── presentation/             # Camada de apresentação
│   ├── controllers/         # Controllers HTTP
│   │   ├── create-user.controller.ts
│   │   ├── update-user.controller.ts
│   │   ├── delete-user.controller.ts
│   │   ├── find-user-by-id.controller.ts
│   │   ├── find-all-users.controller.ts
│   │   └── index.ts
│   ├── routes/              # Rotas HTTP
│   │   └── user.routes.ts
│   ├── validators/          # Validações de entrada
│   │   ├── create-user.validator.ts
│   │   ├── update-user.validator.ts
│   │   ├── find-user-by-id.validator.ts
│   │   ├── delete-user.validator.ts
│   │   ├── find-all-users.validator.ts
│   │   └── index.ts
│   ├── middlewares/         # Middlewares específicos
│   │   ├── user-rate-limit.middleware.ts
│   │   └── index.ts
│   ├── docs/                # Documentação Swagger
│   │   ├── create-user.doc.ts
│   │   ├── update-user.doc.ts
│   │   ├── delete-user.doc.ts
│   │   ├── get-user-by-id.doc.ts
│   │   ├── find-all-users.doc.ts
│   │   └── index.ts
│   └── index.ts
└── infra/                   # Implementações externas
    ├── repositories/        # Implementações dos repositórios
    │   ├── prisma-user.repository.ts
    │   └── index.ts
    └── seeders/            # Seeders de dados
        └── user-seeder.ts
```

## 🔄 Fluxo de Dados

### 1. Criação de Usuário

```
Request → Validator → Rate Limit → Controller → Use Case → Repository → Event → Handler → Response
```

### 2. Atualização de Usuário

```
Request → Auth → Validator → Rate Limit → Controller → Use Case → Repository → Event → Handler → Response
```

### 3. Event-Driven Operations

```
Domain Event → Event Handler → Use Case → Repository → Service → Log
```

## 🎯 Responsabilidades por Camada

### Domain

- **Entities**: Regras de negócio dos usuários
- **Value Objects**: Password com hash e validação
- **Repositories**: Interfaces para acesso a dados
- **Events**: Eventos do domínio (created, updated, deleted)

### Application

- **Use Cases**: Lógica de aplicação (CRUD operations)
- **Events**: Handlers de eventos para auditoria e notificações

### Presentation

- **Controllers**: Endpoints HTTP
- **Routes**: Definição de rotas com middlewares
- **Validators**: Validação de entrada com Zod
- **Middlewares**: Rate limiting específico
- **Docs**: Documentação Swagger

### Infrastructure

- **Repositories**: Implementação Prisma
- **Seeders**: Dados iniciais

## 🔒 Segurança

### Rate Limiting

- **Create User**: 5 requests por minuto por IP
- **Update User**: 3 requests por minuto por IP
- **Delete User**: 2 requests por minuto por IP
- **Middleware**: `userRateLimit`

### Autorização

- **Create**: Público (registro)
- **Read**: `users:read` (autenticado)
- **Update**: `users:update` (autenticado)
- **Delete**: `users:delete` (autenticado)

### Validações

- **Create**: Nome, email, senha, role
- **Update**: Campos opcionais
- **Find**: ID UUID
- **Delete**: ID UUID
- **List**: Paginação e filtros

## 📊 Métricas

### Logs Estruturados

- `user_created`
- `user_updated`
- `user_deleted`
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
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
PASSWORD_SALT_ROUNDS=12
```

## 📈 Monitoramento

### Health Checks

- ✅ Database connectivity
- ✅ JWT validation
- ✅ Password hashing

### Alertas

- ❌ Failed user operations
- ❌ Rate limit exceeded
- ❌ Validation errors

## 🚀 Deploy

### Dependências

- PostgreSQL (users, user_roles, user_preferences)
- JWT (authentication)
- bcrypt (password hashing)

### Migrations

- ✅ Users table
- ✅ User roles table
- ✅ User preferences table

## 🎯 Eventos

### UserCreatedEvent

- Dispara notificação de boas-vindas
- Cria registro de auditoria
- Logs estruturados

### UserUpdatedEvent

- Atualiza cache de usuário
- Registra auditoria
- Logs estruturados

### UserDeletedEvent

- Soft delete do usuário
- Registra auditoria
- Logs estruturados

## 🔄 Integrações

### Módulo Notifications

- Envio de email de boas-vindas
- Notificações de mudanças

### Módulo RBAC

- Controle de acesso baseado em roles
- Permissões granulares

### Módulo Auth

- Autenticação JWT
- Middleware de autenticação

---

_Última atualização: $(date)_
_Versão: 1.0_
