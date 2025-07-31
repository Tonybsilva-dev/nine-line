# Módulo de Avaliações

Este módulo gerencia as avaliações de espaços, permitindo que usuários avaliem espaços e visualizem avaliações de outros usuários.

## 🎯 Funcionalidade Principal

**Sistema completo de avaliações** com validação de ratings, cálculo de média, notificações e controle de spam.

## 📁 Estrutura do Módulo (Padronizada)

```
ratings/
├── domain/
│   ├── entities/
│   │   ├── rating.ts
│   │   └── index.ts
│   ├── repositories/
│   │   ├── rating-repository.ts
│   │   └── index.ts
│   ├── services/
│   │   └── update-space-average-rating.ts
│   └── events/
│       ├── rating-created.event.ts
│       └── index.ts
├── application/
│   ├── use-cases/
│   │   ├── create-rating/
│   │   ├── update-rating/
│   │   ├── delete-rating/
│   │   ├── find-rating-by-id/
│   │   ├── find-ratings-by-space-id/
│   │   ├── find-ratings-by-user-id/
│   │   ├── get-space-average-rating/
│   │   └── index.ts
│   └── events/
│       ├── rating-created.handler.ts
│       ├── rating-events.config.ts
│       └── index.ts
├── presentation/
│   ├── controllers/
│   │   ├── create-rating.controller.ts
│   │   ├── update-rating.controller.ts
│   │   ├── delete-rating.controller.ts
│   │   ├── find-rating-by-id.controller.ts
│   │   ├── find-ratings-by-space-id.controller.ts
│   │   ├── find-ratings-by-user-id.controller.ts
│   │   └── index.ts
│   ├── routes/
│   │   └── rating-routes.ts
│   ├── validators/
│   │   ├── create-rating.validator.ts
│   │   ├── update-rating.validator.ts
│   │   ├── find-rating-by-id.validator.ts
│   │   ├── delete-rating.validator.ts
│   │   ├── find-ratings-by-space-id.validator.ts
│   │   ├── find-ratings-by-user-id.validator.ts
│   │   └── index.ts
│   ├── middlewares/
│   │   ├── rating-rate-limit.middleware.ts
│   │   └── index.ts
│   ├── docs/
│   │   ├── create-rating.doc.ts
│   │   ├── update-rating.doc.ts
│   │   ├── delete-rating.doc.ts
│   │   ├── find-rating-by-id.doc.ts
│   │   ├── find-ratings-by-space-id.doc.ts
│   │   ├── find-ratings-by-user-id.doc.ts
│   │   └── index.ts
│   └── index.ts
└── infra/
    └── repositories/
        ├── prisma-rating.repository.ts
        └── index.ts
```

## 🔒 Segurança Implementada

### Rate Limiting

- **Create Rating**: 5 requests por minuto por IP
- **Update Rating**: 3 requests por minuto por IP
- **Delete Rating**: 2 requests por minuto por IP
- **Middleware**: `ratingRateLimit`

### Validações

- ✅ **Create Rating**: Validação de rating (1-5), comentário, spaceId, userId
- ✅ **Update Rating**: Validação de campos opcionais
- ✅ **Find Rating By ID**: Validação de ID UUID
- ✅ **Delete Rating**: Validação de ID UUID
- ✅ **Find By Space ID**: Validação de spaceId e paginação
- ✅ **Find By User ID**: Validação de userId e paginação

### Autorização

- **Create**: `ratings:create` (autenticado)
- **Read**: `ratings:read` (público)
- **Update**: `ratings:update` (autenticado)
- **Delete**: `ratings:delete` (autenticado)

## ⭐ Sistema de Ratings

### Escala de Avaliação

- **1**: Muito ruim
- **2**: Ruim
- **3**: Regular
- **4**: Bom
- **5**: Excelente

### Cálculo de Média

- Média ponderada por rating
- Atualização automática do espaço
- Cache para performance

## ⚙️ Configuração

### Variáveis de Ambiente

```env
# Ratings
RATING_MIN_VALUE=1
RATING_MAX_VALUE=5
RATING_RATE_LIMIT_CREATE=5
RATING_RATE_LIMIT_UPDATE=3
RATING_RATE_LIMIT_DELETE=2
RATING_RATE_LIMIT_WINDOW=60000
```

### Configuração de Eventos

```typescript
// ✅ Simples e direto
import { configureRatingEvents } from '@/modules/ratings';

configureRatingEvents(eventBus);
```

## 🎯 Handlers Disponíveis

### RatingCreatedHandler ✅

- **Função**: Processa eventos quando avaliação é criada
- **Ações**: Logs, auditoria, atualização de média do espaço

### RatingUpdatedHandler

- **Função**: Processa eventos quando avaliação é atualizada
- **Ações**: Logs, auditoria, atualização de média do espaço

### RatingDeletedHandler

- **Função**: Processa eventos quando avaliação é deletada
- **Ações**: Logs, auditoria, atualização de média do espaço

## 📊 Endpoints Disponíveis

### POST /ratings

- **Função**: Criar nova avaliação
- **Validação**: Rating (1-5), comentário, spaceId, userId
- **Rate Limit**: 5 requests/minuto
- **Autenticação**: Obrigatória

### GET /ratings/:id

- **Função**: Buscar avaliação por ID
- **Validação**: ID UUID
- **Público**: Sim

### GET /ratings/space/:id

- **Função**: Listar avaliações por espaço
- **Validação**: spaceId e paginação
- **Público**: Sim

### GET /ratings/user/:id

- **Função**: Listar avaliações por usuário
- **Validação**: userId e paginação
- **Autenticação**: Obrigatória

### PUT /ratings/:id

- **Função**: Atualizar avaliação
- **Validação**: ID UUID + campos opcionais
- **Rate Limit**: 3 requests/minuto
- **Autenticação**: Obrigatória

### DELETE /ratings/:id

- **Função**: Deletar avaliação
- **Validação**: ID UUID
- **Rate Limit**: 2 requests/minuto
- **Autenticação**: Obrigatória

## 🗄️ Banco de Dados

### Tabelas

- **ratings**: Dados das avaliações

### Relacionamentos

- `Rating` → `User` (usuário que fez a avaliação)
- `Rating` → `Space` (espaço avaliado)

## 🎯 Eventos Integrados

### RatingCreatedEvent ✅

- ✅ Dispara notificação para o proprietário do espaço
- ✅ Atualiza média do espaço
- ✅ Cria registro de auditoria
- ✅ Logs estruturados

### RatingUpdatedEvent

- ✅ Dispara notificação para o proprietário do espaço
- ✅ Atualiza média do espaço
- ✅ Registra auditoria
- ✅ Logs estruturados

### RatingDeletedEvent

- ✅ Atualiza média do espaço
- ✅ Registra auditoria
- ✅ Logs estruturados

## 🔍 Troubleshooting

### Avaliação não encontrada

- Verificar se o ID é um UUID válido
- Verificar se a avaliação não foi deletada
- Verificar logs de auditoria

### Rating inválido

- Verificar se o rating está entre 1 e 5
- Verificar se o rating é um número inteiro
- Verificar logs de validação

### Rate Limit Exceeded

- Verificar se o IP não excedeu o limite
- Aguardar o reset da janela de tempo
- Verificar logs de rate limiting

### Validação falhou

- Verificar se todos os campos obrigatórios estão presentes
- Verificar se o rating está na escala correta
- Verificar se o comentário não excede o limite

## 📈 Logs

Todos os handlers registram logs estruturados:

```typescript
logger.info({
  type: 'rating_created_handler',
  eventId: event.eventId,
  ratingId: event.rating.id.toString(),
  userId: event.rating.userId.toString(),
  spaceId: event.rating.spaceId.toString(),
  rating: event.rating.rating,
});
```

## ✅ Como Funciona

1. **Avaliação é criada** → `RatingCreatedEvent` é disparado
2. **RatingCreatedHandler** é executado
3. **Média do espaço é atualizada** automaticamente
4. **Notificação é enviada** para o proprietário do espaço
5. **Auditoria é registrada** no banco de dados
6. **Logs são estruturados** para monitoramento

**Resultado**: Avaliação criada com todas as validações e eventos! 🎉

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
- Implementar cache de avaliações

---

_Última atualização: $(date)_
_Versão: 1.0 - Padronizado_
