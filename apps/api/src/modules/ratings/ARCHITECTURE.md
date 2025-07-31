# 📋 Arquitetura do Módulo Ratings

## 🎯 Visão Geral

O módulo `ratings` é responsável por gerenciar as avaliações de espaços, permitindo que usuários avaliem espaços e visualizem avaliações de outros usuários.

## 🏗️ Estrutura Clean Architecture

```
ratings/
├── domain/                    # Regras de negócio
│   ├── entities/             # Entidades do domínio
│   │   ├── rating.ts
│   │   └── index.ts
│   ├── repositories/         # Interfaces dos repositórios
│   │   ├── rating-repository.ts
│   │   └── index.ts
│   ├── services/            # Serviços do domínio
│   │   └── update-space-average-rating.ts
│   └── events/              # Eventos do domínio
│       ├── rating-created.event.ts
│       └── index.ts
├── application/              # Casos de uso
│   ├── use-cases/
│   │   ├── create-rating/      # Caso de uso de criar avaliação
│   │   ├── update-rating/      # Caso de uso de atualizar avaliação
│   │   ├── delete-rating/      # Caso de uso de deletar avaliação
│   │   ├── find-rating-by-id/  # Caso de uso de buscar avaliação
│   │   ├── find-ratings-by-space-id/ # Caso de uso de buscar por espaço
│   │   ├── find-ratings-by-user-id/  # Caso de uso de buscar por usuário
│   │   ├── get-space-average-rating/ # Caso de uso de média do espaço
│   │   └── index.ts
│   └── events/              # Event handlers
│       ├── rating-created.handler.ts
│       ├── rating-events.config.ts
│       └── index.ts
├── presentation/             # Camada de apresentação
│   ├── controllers/         # Controllers HTTP
│   │   ├── create-rating.controller.ts
│   │   ├── update-rating.controller.ts
│   │   ├── delete-rating.controller.ts
│   │   ├── find-rating-by-id.controller.ts
│   │   ├── find-ratings-by-space-id.controller.ts
│   │   ├── find-ratings-by-user-id.controller.ts
│   │   └── index.ts
│   ├── routes/              # Rotas HTTP
│   │   └── rating-routes.ts
│   ├── validators/          # Validações de entrada
│   │   ├── create-rating.validator.ts
│   │   ├── update-rating.validator.ts
│   │   ├── find-rating-by-id.validator.ts
│   │   ├── delete-rating.validator.ts
│   │   ├── find-ratings-by-space-id.validator.ts
│   │   ├── find-ratings-by-user-id.validator.ts
│   │   └── index.ts
│   ├── middlewares/         # Middlewares específicos
│   │   ├── rating-rate-limit.middleware.ts
│   │   └── index.ts
│   ├── docs/                # Documentação Swagger
│   │   ├── create-rating.doc.ts
│   │   ├── update-rating.doc.ts
│   │   ├── delete-rating.doc.ts
│   │   ├── find-rating-by-id.doc.ts
│   │   ├── find-ratings-by-space-id.doc.ts
│   │   ├── find-ratings-by-user-id.doc.ts
│   │   └── index.ts
│   └── index.ts
└── infra/                   # Implementações externas
    └── repositories/        # Implementações dos repositórios
        ├── prisma-rating.repository.ts
        └── index.ts
```

## 🔄 Fluxo de Dados

### 1. Criação de Avaliação

```
Request → Validator → Rate Limit → Controller → Use Case → Repository → Event → Handler → Response
```

### 2. Atualização de Avaliação

```
Request → Auth → Validator → Rate Limit → Controller → Use Case → Repository → Event → Handler → Response
```

### 3. Event-Driven Operations

```
Domain Event → Event Handler → Use Case → Repository → Service → Log
```

## 🎯 Responsabilidades por Camada

### Domain

- **Entities**: Regras de negócio das avaliações
- **Repositories**: Interfaces para acesso a dados
- **Services**: Cálculo de média do espaço
- **Events**: Eventos do domínio (created)

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

- **Create Rating**: 5 requests por minuto por IP
- **Update Rating**: 3 requests por minuto por IP
- **Delete Rating**: 2 requests por minuto por IP
- **Middleware**: `ratingRateLimit`

### Autorização

- **Create**: `ratings:create` (autenticado)
- **Read**: `ratings:read` (público)
- **Update**: `ratings:update` (autenticado)
- **Delete**: `ratings:delete` (autenticado)

### Validações

- **Create**: Rating (1-5), comentário, spaceId, userId
- **Update**: Campos opcionais
- **Find**: ID UUID
- **Delete**: ID UUID
- **List**: Paginação e filtros

## 📊 Métricas

### Logs Estruturados

- `rating_created`
- `rating_updated`
- `rating_deleted`
- `space_average_updated`
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
RATING_MIN_VALUE=1
RATING_MAX_VALUE=5
RATING_RATE_LIMIT_CREATE=5
RATING_RATE_LIMIT_UPDATE=3
RATING_RATE_LIMIT_DELETE=2
RATING_RATE_LIMIT_WINDOW=60000
```

## 📈 Monitoramento

### Health Checks

- ✅ Database connectivity
- ✅ Rating validation
- ✅ Average calculation

### Alertas

- ❌ Failed rating operations
- ❌ Rate limit exceeded
- ❌ Validation errors

## 🚀 Deploy

### Dependências

- PostgreSQL (ratings)
- Prisma (ORM)

### Migrations

- ✅ Ratings table

## 🎯 Eventos

### RatingCreatedEvent

- Dispara notificação para o proprietário do espaço
- Atualiza média do espaço
- Cria registro de auditoria
- Logs estruturados

### RatingUpdatedEvent

- Dispara notificação para o proprietário do espaço
- Atualiza média do espaço
- Registra auditoria
- Logs estruturados

### RatingDeletedEvent

- Atualiza média do espaço
- Registra auditoria
- Logs estruturados

## 🔄 Integrações

### Módulo Users

- Usuário que fez a avaliação
- Verificação de status

### Módulo Spaces

- Espaço avaliado
- Atualização de média

### Módulo Notifications

- Notificações de avaliação
- Alertas para proprietários

### Módulo RBAC

- Controle de acesso
- Permissões granulares

---

_Última atualização: $(date)_
_Versão: 1.0_
