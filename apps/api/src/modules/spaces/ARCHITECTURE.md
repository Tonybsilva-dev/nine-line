# 📋 Arquitetura do Módulo Spaces

## 🎯 Visão Geral

O módulo `spaces` é responsável por gerenciar os espaços da aplicação, incluindo criação, atualização, exclusão e consulta de espaços disponíveis para agendamento.

## 🏗️ Estrutura Clean Architecture

```
spaces/
├── domain/                    # Regras de negócio
│   ├── entities/             # Entidades do domínio
│   │   ├── space.ts
│   │   └── index.ts
│   ├── repositories/         # Interfaces dos repositórios
│   │   └── space-repository.ts
│   └── events/              # Eventos do domínio
│       ├── space-created.event.ts
│       ├── space-updated.event.ts
│       ├── space-deleted.event.ts
│       └── index.ts
├── application/              # Casos de uso
│   ├── use-cases/
│   │   ├── create-space/
│   │   ├── update-space/
│   │   ├── delete-space/
│   │   ├── find-space/
│   │   └── index.ts
│   └── events/              # Event handlers
│       ├── space-created.handler.ts
│       ├── space-updated.handler.ts
│       ├── space-deleted.handler.ts
│       ├── space-events.config.ts
│       └── index.ts
├── presentation/             # Camada de apresentação
│   ├── controllers/         # Controllers HTTP
│   │   ├── create-space.controller.ts
│   │   ├── update-space.controller.ts
│   │   ├── delete-space.controller.ts
│   │   ├── find-space-by-id.controller.ts
│   │   ├── find-all-spaces.controller.ts
│   │   └── index.ts
│   ├── routes/              # Rotas HTTP
│   │   └── space.routes.ts
│   ├── validators/          # Validações de entrada
│   │   ├── create-space.validator.ts
│   │   ├── update-space.validator.ts
│   │   ├── find-space-by-id.validator.ts
│   │   ├── delete-space.validator.ts
│   │   ├── find-all-spaces.validator.ts
│   │   └── index.ts
│   ├── middlewares/         # Middlewares específicos
│   │   ├── space-rate-limit.middleware.ts
│   │   └── index.ts
│   ├── docs/                # Documentação Swagger
│   │   ├── create-space.doc.ts
│   │   ├── update-space.doc.ts
│   │   ├── delete-space.doc.ts
│   │   ├── find-space-by-id.doc.ts
│   │   ├── find-all-spaces.doc.ts
│   │   └── index.ts
│   └── index.ts
└── infra/                   # Implementações externas
    └── repositories/        # Implementações dos repositórios
        ├── prisma-space.repository.ts
        └── index.ts
```

## 🔄 Fluxo de Dados

### 1. Criação de Espaço

```
Request → Validator → Rate Limit → Controller → Use Case → Repository → Event → Handler → Response
```

### 2. Atualização de Espaço

```
Request → Auth → Validator → Rate Limit → Controller → Use Case → Repository → Event → Handler → Response
```

### 3. Event-Driven Operations

```
Domain Event → Event Handler → Use Case → Repository → Service → Log
```

## 🎯 Responsabilidades por Camada

### Domain

- **Entities**: Regras de negócio dos espaços
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

## 🔒 Segurança

### Rate Limiting

- **Create Space**: 5 requests por minuto por IP
- **Update Space**: 3 requests por minuto por IP
- **Delete Space**: 2 requests por minuto por IP
- **Middleware**: `spaceRateLimit`

### Autorização

- **Create**: `spaces:create` (autenticado)
- **Read**: `spaces:read` (público)
- **Update**: `spaces:update` (autenticado)
- **Delete**: `spaces:delete` (autenticado)

### Validações

- **Create**: Título, descrição, preço, categoria
- **Update**: Campos opcionais
- **Find**: ID UUID
- **Delete**: ID UUID
- **List**: Paginação e filtros

## 📊 Métricas

### Logs Estruturados

- `space_created`
- `space_updated`
- `space_deleted`
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
DEFAULT_SPACE_CATEGORY=MEETING_ROOM
MAX_SPACE_PRICE=1000.00
MIN_SPACE_PRICE=10.00
```

## 📈 Monitoramento

### Health Checks

- ✅ Database connectivity
- ✅ Space validation
- ✅ Price validation

### Alertas

- ❌ Failed space operations
- ❌ Rate limit exceeded
- ❌ Validation errors

## 🚀 Deploy

### Dependências

- PostgreSQL (spaces, space_categories, space_amenities)
- Prisma (ORM)

### Migrations

- ✅ Spaces table
- ✅ Space categories table
- ✅ Space amenities table

## 🎯 Eventos

### SpaceCreatedEvent

- Dispara notificação para administradores
- Cria registro de auditoria
- Logs estruturados

### SpaceUpdatedEvent

- Atualiza cache de espaço
- Registra auditoria
- Logs estruturados

### SpaceDeletedEvent

- Soft delete do espaço
- Registra auditoria
- Logs estruturados

## 🔄 Integrações

### Módulo Users

- Proprietário do espaço
- Controle de acesso

### Módulo Appointments

- Agendamentos do espaço
- Disponibilidade

### Módulo Ratings

- Avaliações do espaço
- Reputação

---

_Última atualização: $(date)_
_Versão: 1.0_
