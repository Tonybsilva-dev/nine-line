# Módulo de Usuários

Este módulo gerencia os usuários da aplicação, incluindo criação, atualização, exclusão e consulta de usuários.

## 🎯 Funcionalidade Principal

**Gerenciamento completo de usuários** com autenticação, autorização e controle de acesso baseado em roles.

## 📁 Estrutura do Módulo (Padronizada)

```
users/
├── domain/
│   ├── entities/
│   │   ├── user.ts                    # Entidade de usuário
│   │   ├── value-objects/
│   │   │   └── password.ts            # Value object para senha
│   │   └── index.ts
│   ├── repositories/
│   │   └── user.repository.ts         # Interface do repositório
│   └── events/
│       ├── user-created.event.ts      # Evento de usuário criado
│       ├── user-updated.event.ts      # Evento de usuário atualizado
│       ├── user-deleted.event.ts      # Evento de usuário deletado
│       └── index.ts
├── application/
│   ├── use-cases/
│   │   ├── create-user/               # Caso de uso criar usuário
│   │   ├── update-user/               # Caso de uso atualizar usuário
│   │   ├── delete-user/               # Caso de uso deletar usuário
│   │   ├── find-user/                 # Casos de uso buscar usuário
│   │   ├── count/                     # Caso de uso contar usuários
│   │   └── index.ts
│   └── events/
│       ├── user-created.handler.ts    # Handler para usuário criado
│       ├── user-updated.handler.ts    # Handler para usuário atualizado
│       ├── user-deleted.handler.ts    # Handler para usuário deletado
│       ├── user-events.config.ts      # Configuração de eventos
│       └── index.ts
├── presentation/
│   ├── controllers/
│   │   ├── create-user.controller.ts
│   │   ├── update-user.controller.ts
│   │   ├── delete-user.controller.ts
│   │   ├── find-user-by-id.controller.ts
│   │   ├── find-all-users.controller.ts
│   │   └── index.ts
│   ├── routes/
│   │   └── user.routes.ts
│   ├── validators/
│   │   ├── create-user.validator.ts
│   │   ├── update-user.validator.ts
│   │   ├── find-user-by-id.validator.ts
│   │   ├── delete-user.validator.ts
│   │   ├── find-all-users.validator.ts
│   │   └── index.ts
│   ├── middlewares/
│   │   ├── user-rate-limit.middleware.ts
│   │   └── index.ts
│   ├── docs/
│   │   ├── create-user.doc.ts
│   │   ├── update-user.doc.ts
│   │   ├── delete-user.doc.ts
│   │   ├── get-user-by-id.doc.ts
│   │   ├── find-all-users.doc.ts
│   │   └── index.ts
│   └── index.ts
└── infra/
    ├── repositories/
    │   ├── prisma-user.repository.ts   # Implementação Prisma
    │   └── index.ts
    └── seeders/
        └── user-seeder.ts              # Seeder de usuários
```

## 🔒 Segurança Implementada

### Rate Limiting

- **Create User**: 5 requests por minuto por IP
- **Update User**: 3 requests por minuto por IP
- **Delete User**: 2 requests por minuto por IP
- **Middleware**: `userRateLimit`

### Validações

- ✅ **Create User**: Validação de nome, email, senha, role
- ✅ **Update User**: Validação de campos opcionais
- ✅ **Find User By ID**: Validação de ID UUID
- ✅ **Delete User**: Validação de ID UUID
- ✅ **Find All Users**: Validação de paginação e filtros

### Autorização

- **Create**: Público (registro)
- **Read**: `users:read` (autenticado)
- **Update**: `users:update` (autenticado)
- **Delete**: `users:delete` (autenticado)

## 👥 Tipos de Usuário

### Roles Disponíveis

- **USER**: Usuário comum
- **ADMIN**: Administrador do sistema
- **HOST**: Proprietário de espaços

### Status Disponíveis

- **ACTIVE**: Usuário ativo
- **INACTIVE**: Usuário inativo

## ⚙️ Configuração

### Variáveis de Ambiente

```env
# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# Password
PASSWORD_SALT_ROUNDS=12
```

### Configuração de Eventos

```typescript
// ✅ Simples e direto
import { configureUserEvents } from '@/modules/users';

configureUserEvents(eventBus);
```

## 🎯 Handlers Disponíveis

### UserCreatedHandler ✅

- **Função**: Processa eventos quando usuário é criado
- **Ações**: Logs, notificações, auditoria

### UserUpdatedHandler

- **Função**: Processa eventos quando usuário é atualizado
- **Ações**: Logs, auditoria, cache invalidation

### UserDeletedHandler

- **Função**: Processa eventos quando usuário é deletado
- **Ações**: Logs, auditoria, soft delete

## 📊 Endpoints Disponíveis

### POST /users

- **Função**: Criar novo usuário
- **Validação**: Nome, email, senha, role
- **Rate Limit**: 5 requests/minuto

### GET /users

- **Função**: Listar usuários com paginação
- **Validação**: Paginação e filtros
- **Autenticação**: Obrigatória

### GET /users/:id

- **Função**: Buscar usuário por ID
- **Validação**: ID UUID
- **Autenticação**: Obrigatória

### PUT /users/:id

- **Função**: Atualizar usuário
- **Validação**: ID UUID + campos opcionais
- **Rate Limit**: 3 requests/minuto
- **Autenticação**: Obrigatória

### DELETE /users/:id

- **Função**: Deletar usuário (soft delete)
- **Validação**: ID UUID
- **Rate Limit**: 2 requests/minuto
- **Autenticação**: Obrigatória

## 🗄️ Banco de Dados

### Tabelas

- **users**: Dados dos usuários
- **user_roles**: Relacionamento usuário-role
- **user_preferences**: Preferências dos usuários

### Relacionamentos

- `User` → `UserRole` (muitos para muitos)
- `User` → `UserPreferences` (um para um)
- `User` → `Appointment` (um para muitos)

## 🎯 Eventos Integrados

### UserCreatedEvent ✅

- ✅ Dispara notificação de boas-vindas
- ✅ Cria registro de auditoria
- ✅ Logs estruturados

### UserUpdatedEvent

- ✅ Atualiza cache de usuário
- ✅ Registra auditoria
- ✅ Logs estruturados

### UserDeletedEvent

- ✅ Soft delete do usuário
- ✅ Registra auditoria
- ✅ Logs estruturados

## 🔍 Troubleshooting

### Usuário não encontrado

- Verificar se o ID é um UUID válido
- Verificar se o usuário não foi deletado (soft delete)
- Verificar logs de auditoria

### Rate Limit Exceeded

- Verificar se o IP não excedeu o limite
- Aguardar o reset da janela de tempo
- Verificar logs de rate limiting

### Validação falhou

- Verificar se todos os campos obrigatórios estão presentes
- Verificar se o email é único
- Verificar se a senha atende aos requisitos

## 📈 Logs

Todos os handlers registram logs estruturados:

```typescript
logger.info({
  type: 'user_created_handler',
  eventId: event.eventId,
  userId: event.user.id.toString(),
  userEmail: event.user.email,
});
```

## ✅ Como Funciona

1. **Usuário é criado** → `UserCreatedEvent` é disparado
2. **UserCreatedHandler** é executado
3. **Notificação é enviada** via módulo notifications
4. **Auditoria é registrada** no banco de dados
5. **Logs são estruturados** para monitoramento

**Resultado**: Usuário criado com todas as validações e eventos! 🎉

## 📋 Status de Padronização

### ✅ Implementado

- ✅ Estrutura Clean Architecture completa
- ✅ README.md detalhado
- ✅ index.ts com exports organizados
- ✅ Validações para todos os endpoints
- ✅ Middleware de rate limiting
- ✅ Documentação Swagger
- ✅ Logs estruturados
- ✅ Eventos do domínio

### 🎯 Próximos Passos

- Implementar testes para middlewares
- Implementar testes para use cases
- Adicionar métricas de monitoramento
- Implementar cache de usuários

---

_Última atualização: $(date)_
_Versão: 1.0 - Padronizado_
