# Módulo de Espaços

Este módulo gerencia os espaços da aplicação, incluindo criação, atualização, exclusão e consulta de espaços disponíveis para agendamento.

## 🎯 Funcionalidade Principal

**Gerenciamento completo de espaços** para agendamento, incluindo informações detalhadas, preços, disponibilidade e categorias.

## 📁 Estrutura do Módulo (Padronizada)

```
spaces/
├── domain/
│   ├── entities/
│   │   ├── space.ts                    # Entidade de espaço
│   │   └── index.ts
│   ├── repositories/
│   │   └── space-repository.ts         # Interface do repositório
│   └── events/
│       ├── space-created.event.ts      # Evento de espaço criado
│       ├── space-updated.event.ts      # Evento de espaço atualizado
│       ├── space-deleted.event.ts      # Evento de espaço deletado
│       └── index.ts
├── application/
│   ├── use-cases/
│   │   ├── create-space/               # Caso de uso criar espaço
│   │   ├── update-space/               # Caso de uso atualizar espaço
│   │   ├── delete-space/               # Caso de uso deletar espaço
│   │   ├── find-space/                 # Casos de uso buscar espaço
│   │   └── index.ts
│   └── events/
│       ├── space-created.handler.ts    # Handler para espaço criado
│       ├── space-updated.handler.ts    # Handler para espaço atualizado
│       ├── space-deleted.handler.ts    # Handler para espaço deletado
│       ├── space-events.config.ts      # Configuração de eventos
│       └── index.ts
├── presentation/
│   ├── controllers/
│   │   ├── create-space.controller.ts
│   │   ├── update-space.controller.ts
│   │   ├── delete-space.controller.ts
│   │   ├── find-space-by-id.controller.ts
│   │   ├── find-all-spaces.controller.ts
│   │   └── index.ts
│   ├── routes/
│   │   └── space.routes.ts
│   ├── validators/
│   │   ├── create-space.validator.ts
│   │   ├── update-space.validator.ts
│   │   ├── find-space-by-id.validator.ts
│   │   ├── delete-space.validator.ts
│   │   ├── find-all-spaces.validator.ts
│   │   └── index.ts
│   ├── middlewares/
│   │   ├── space-rate-limit.middleware.ts
│   │   └── index.ts
│   ├── docs/
│   │   ├── create-space.doc.ts
│   │   ├── update-space.doc.ts
│   │   ├── delete-space.doc.ts
│   │   ├── find-space-by-id.doc.ts
│   │   ├── find-all-spaces.doc.ts
│   │   └── index.ts
│   └── index.ts
└── infra/
    └── repositories/
        ├── prisma-space.repository.ts   # Implementação Prisma
        └── index.ts
```

## 🔒 Segurança Implementada

### Rate Limiting

- **Create Space**: 5 requests por minuto por IP
- **Update Space**: 3 requests por minuto por IP
- **Delete Space**: 2 requests por minuto por IP
- **Middleware**: `spaceRateLimit`

### Validações

- ✅ **Create Space**: Validação de título, descrição, preço, categoria
- ✅ **Update Space**: Validação de campos opcionais
- ✅ **Find Space By ID**: Validação de ID UUID
- ✅ **Delete Space**: Validação de ID UUID
- ✅ **Find All Spaces**: Validação de paginação e filtros

### Autorização

- **Create**: `spaces:create` (autenticado)
- **Read**: `spaces:read` (público)
- **Update**: `spaces:update` (autenticado)
- **Delete**: `spaces:delete` (autenticado)

## 🏢 Tipos de Espaço

### Categorias Disponíveis

- **MEETING_ROOM**: Sala de reunião
- **COWORKING**: Espaço de coworking
- **EVENT_SPACE**: Espaço para eventos
- **OFFICE**: Escritório
- **STUDIO**: Estúdio
- **OTHER**: Outros

### Status Disponíveis

- **AVAILABLE**: Espaço disponível
- **UNAVAILABLE**: Espaço indisponível
- **MAINTENANCE**: Em manutenção

## ⚙️ Configuração

### Variáveis de Ambiente

```env
# Espaços
DEFAULT_SPACE_CATEGORY=MEETING_ROOM
MAX_SPACE_PRICE=1000.00
MIN_SPACE_PRICE=10.00
```

### Configuração de Eventos

```typescript
// ✅ Simples e direto
import { configureSpaceEvents } from '@/modules/spaces';

configureSpaceEvents(eventBus);
```

## 🎯 Handlers Disponíveis

### SpaceCreatedHandler ✅

- **Função**: Processa eventos quando espaço é criado
- **Ações**: Logs, auditoria, cache invalidation

### SpaceUpdatedHandler

- **Função**: Processa eventos quando espaço é atualizado
- **Ações**: Logs, auditoria, cache invalidation

### SpaceDeletedHandler

- **Função**: Processa eventos quando espaço é deletado
- **Ações**: Logs, auditoria, soft delete

## 📊 Endpoints Disponíveis

### POST /spaces

- **Função**: Criar novo espaço
- **Validação**: Título, descrição, preço, categoria
- **Rate Limit**: 5 requests/minuto

### GET /spaces

- **Função**: Listar espaços com paginação e filtros
- **Validação**: Paginação e filtros
- **Público**: Sim

### GET /spaces/:id

- **Função**: Buscar espaço por ID
- **Validação**: ID UUID
- **Público**: Sim

### PUT /spaces/:id

- **Função**: Atualizar espaço
- **Validação**: ID UUID + campos opcionais
- **Rate Limit**: 3 requests/minuto
- **Autenticação**: Obrigatória

### DELETE /spaces/:id

- **Função**: Deletar espaço (soft delete)
- **Validação**: ID UUID
- **Rate Limit**: 2 requests/minuto
- **Autenticação**: Obrigatória

## 🗄️ Banco de Dados

### Tabelas

- **spaces**: Dados dos espaços
- **space_categories**: Categorias de espaços
- **space_amenities**: Amenidades dos espaços

### Relacionamentos

- `Space` → `User` (proprietário)
- `Space` → `Appointment` (agendamentos)
- `Space` → `Rating` (avaliações)

## 🎯 Eventos Integrados

### SpaceCreatedEvent ✅

- ✅ Dispara notificação para administradores
- ✅ Cria registro de auditoria
- ✅ Logs estruturados

### SpaceUpdatedEvent

- ✅ Atualiza cache de espaço
- ✅ Registra auditoria
- ✅ Logs estruturados

### SpaceDeletedEvent

- ✅ Soft delete do espaço
- ✅ Registra auditoria
- ✅ Logs estruturados

## 🔍 Troubleshooting

### Espaço não encontrado

- Verificar se o ID é um UUID válido
- Verificar se o espaço não foi deletado (soft delete)
- Verificar logs de auditoria

### Rate Limit Exceeded

- Verificar se o IP não excedeu o limite
- Aguardar o reset da janela de tempo
- Verificar logs de rate limiting

### Validação falhou

- Verificar se todos os campos obrigatórios estão presentes
- Verificar se o preço está dentro dos limites
- Verificar se a categoria é válida

## 📈 Logs

Todos os handlers registram logs estruturados:

```typescript
logger.info({
  type: 'space_created_handler',
  eventId: event.eventId,
  spaceId: event.space.id.toString(),
  spaceTitle: event.space.title,
});
```

## ✅ Como Funciona

1. **Espaço é criado** → `SpaceCreatedEvent` é disparado
2. **SpaceCreatedHandler** é executado
3. **Notificação é enviada** para administradores
4. **Auditoria é registrada** no banco de dados
5. **Logs são estruturados** para monitoramento

**Resultado**: Espaço criado com todas as validações e eventos! 🎉

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
- Implementar cache de espaços

---

_Última atualização: $(date)_
_Versão: 1.0 - Padronizado_
