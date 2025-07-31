# Módulo de Agendamentos

Este módulo gerencia os agendamentos de espaços, permitindo que usuários agendem o uso de um espaço em uma data e horário específicos.

## 🎯 Funcionalidade Principal

**Sistema completo de agendamentos** com validação de conflitos, aprovação/rejeição, notificações e controle de status.

## 📁 Estrutura do Módulo (Padronizada)

```
appointments/
├── domain/
│   ├── entities/
│   │   ├── appointment.ts
│   │   └── index.ts
│   ├── repositories/
│   │   ├── appointment-repository.ts
│   │   └── index.ts
│   └── events/
│       ├── appointment-created.event.ts
│       ├── appointment-updated.event.ts
│       ├── appointment-deleted.event.ts
│       ├── appointment-approved.event.ts
│       ├── appointment-rejected.event.ts
│       └── index.ts
├── application/
│   ├── use-cases/
│   │   ├── create-appointment/
│   │   ├── find-appointment/
│   │   ├── update-appointment/
│   │   ├── delete-appointment/
│   │   ├── approve-appointment/
│   │   ├── reject-appointment/
│   │   └── index.ts
│   └── events/
│       ├── appointment-created.handler.ts
│       ├── appointment-updated.handler.ts
│       ├── appointment-deleted.handler.ts
│       ├── appointment-events.config.ts
│       └── index.ts
├── presentation/
│   ├── controllers/
│   │   ├── create-appointment.controller.ts
│   │   ├── update-appointment.controller.ts
│   │   ├── delete-appointment.controller.ts
│   │   ├── find-appointment-by-id.controller.ts
│   │   ├── find-all-appointments.controller.ts
│   │   ├── find-appointments-by-user-id.controller.ts
│   │   ├── find-appointments-by-space-id.controller.ts
│   │   ├── approve-appointment.controller.ts
│   │   ├── reject-appointment.controller.ts
│   │   └── index.ts
│   ├── routes/
│   │   └── appointment-routes.ts
│   ├── validators/
│   │   ├── create-appointment.validator.ts
│   │   ├── update-appointment.validator.ts
│   │   ├── find-appointment-by-id.validator.ts
│   │   ├── delete-appointment.validator.ts
│   │   ├── find-all-appointments.validator.ts
│   │   ├── find-appointments-by-user-id.validator.ts
│   │   ├── find-appointments-by-space-id.validator.ts
│   │   ├── approve-appointment.validator.ts
│   │   ├── reject-appointment.validator.ts
│   │   └── index.ts
│   ├── middlewares/
│   │   ├── appointment-rate-limit.middleware.ts
│   │   └── index.ts
│   ├── docs/
│   │   ├── create-appointment.doc.ts
│   │   ├── update-appointment.doc.ts
│   │   ├── delete-appointment.doc.ts
│   │   ├── find-appointment-by-id.doc.ts
│   │   ├── find-all-appointments.doc.ts
│   │   ├── find-appointments-by-user-id.doc.ts
│   │   ├── find-appointments-by-space-id.doc.ts
│   │   ├── approve-appointment.doc.ts
│   │   ├── reject-appointment.doc.ts
│   │   └── index.ts
│   └── index.ts
└── infra/
    └── repositories/
        ├── prisma-appointment.repository.ts
        └── index.ts
```

## 🔒 Segurança Implementada

### Rate Limiting

- **Create Appointment**: 5 requests por minuto por IP
- **Update Appointment**: 3 requests por minuto por IP
- **Delete Appointment**: 2 requests por minuto por IP
- **Approve/Reject**: 3 requests por minuto por IP
- **Middleware**: `appointmentRateLimit`

### Validações

- ✅ **Create Appointment**: Validação de dados do agendamento
- ✅ **Update Appointment**: Validação de campos opcionais
- ✅ **Find Appointment By ID**: Validação de ID UUID
- ✅ **Delete Appointment**: Validação de ID UUID
- ✅ **Find All Appointments**: Validação de paginação e filtros
- ✅ **Find By User ID**: Validação de userId e paginação
- ✅ **Find By Space ID**: Validação de spaceId e paginação
- ✅ **Approve Appointment**: Validação de ID UUID
- ✅ **Reject Appointment**: Validação de ID UUID

### Autorização

- **Create**: `appointments:create` (autenticado)
- **Read**: `appointments:read` (autenticado)
- **Update**: `appointments:update` (autenticado)
- **Delete**: `appointments:delete` (autenticado)
- **Approve/Reject**: `appointments:approve` (administrador)

## 📋 Status de Agendamento

### Status Disponíveis

- **PENDING**: Aguardando aprovação
- **APPROVED**: Aprovado
- **REJECTED**: Rejeitado
- **CANCELLED**: Cancelado

## ⚙️ Configuração

### Variáveis de Ambiente

```env
# Appointments
APPOINTMENT_MIN_DURATION=30
APPOINTMENT_MAX_DURATION=480
APPOINTMENT_RATE_LIMIT_CREATE=5
APPOINTMENT_RATE_LIMIT_UPDATE=3
APPOINTMENT_RATE_LIMIT_DELETE=2
APPOINTMENT_RATE_LIMIT_APPROVE=3
```

### Configuração de Eventos

```typescript
// ✅ Simples e direto
import { configureAppointmentEvents } from '@/modules/appointments';

configureAppointmentEvents(eventBus);
```

## 🎯 Handlers Disponíveis

### AppointmentCreatedHandler ✅

- **Função**: Processa eventos quando agendamento é criado
- **Ações**: Logs, auditoria, notificações

### AppointmentUpdatedHandler

- **Função**: Processa eventos quando agendamento é atualizado
- **Ações**: Logs, auditoria, notificações

### AppointmentDeletedHandler

- **Função**: Processa eventos quando agendamento é deletado
- **Ações**: Logs, auditoria, notificações

## 📊 Endpoints Disponíveis

### POST /appointments

- **Função**: Criar novo agendamento
- **Validação**: Dados do agendamento
- **Rate Limit**: 5 requests/minuto
- **Autenticação**: Obrigatória

### GET /appointments/:id

- **Função**: Buscar agendamento por ID
- **Validação**: ID UUID
- **Autenticação**: Obrigatória

### GET /appointments

- **Função**: Listar todos os agendamentos
- **Validação**: Paginação e filtros
- **Autenticação**: Obrigatória

### GET /appointments/user/:id

- **Função**: Listar agendamentos por usuário
- **Validação**: userId e paginação
- **Autenticação**: Obrigatória

### GET /appointments/space/:id

- **Função**: Listar agendamentos por espaço
- **Validação**: spaceId e paginação
- **Autenticação**: Obrigatória

### PUT /appointments/:id

- **Função**: Atualizar agendamento
- **Validação**: ID UUID + campos opcionais
- **Rate Limit**: 3 requests/minuto
- **Autenticação**: Obrigatória

### DELETE /appointments/:id

- **Função**: Deletar agendamento
- **Validação**: ID UUID
- **Rate Limit**: 2 requests/minuto
- **Autenticação**: Obrigatória

### PATCH /appointments/:id/approve

- **Função**: Aprovar agendamento
- **Validação**: ID UUID
- **Rate Limit**: 3 requests/minuto
- **Autenticação**: Obrigatória

### PATCH /appointments/:id/reject

- **Função**: Rejeitar agendamento
- **Validação**: ID UUID
- **Rate Limit**: 3 requests/minuto
- **Autenticação**: Obrigatória

## 🗄️ Banco de Dados

### Tabelas

- **appointments**: Dados dos agendamentos

### Relacionamentos

- `Appointment` → `User` (usuário que fez o agendamento)
- `Appointment` → `Space` (espaço agendado)

## 🎯 Eventos Integrados

### AppointmentCreatedEvent ✅

- ✅ Dispara notificação para o usuário
- ✅ Cria registro de auditoria
- ✅ Logs estruturados

### AppointmentUpdatedEvent

- ✅ Dispara notificação para o usuário
- ✅ Registra auditoria
- ✅ Logs estruturados

### AppointmentDeletedEvent

- ✅ Dispara notificação para o usuário
- ✅ Registra auditoria
- ✅ Logs estruturados

### AppointmentApprovedEvent

- ✅ Dispara notificação para o usuário
- ✅ Registra auditoria
- ✅ Logs estruturados

### AppointmentRejectedEvent

- ✅ Dispara notificação para o usuário
- ✅ Registra auditoria
- ✅ Logs estruturados

## 🔍 Troubleshooting

### Agendamento não encontrado

- Verificar se o ID é um UUID válido
- Verificar se o agendamento não foi deletado
- Verificar logs de auditoria

### Conflito de horários

- Verificar se o espaço está disponível no horário
- Verificar se não há outros agendamentos no mesmo período
- Verificar logs de conflitos

### Rate Limit Exceeded

- Verificar se o IP não excedeu o limite
- Aguardar o reset da janela de tempo
- Verificar logs de rate limiting

### Validação falhou

- Verificar se todos os campos obrigatórios estão presentes
- Verificar se as datas são válidas
- Verificar se o horário de início é menor que o de fim

## 📈 Logs

Todos os handlers registram logs estruturados:

```typescript
logger.info({
  type: 'appointment_created_handler',
  eventId: event.eventId,
  appointmentId: event.appointment.id.toString(),
  userId: event.appointment.userId.toString(),
  spaceId: event.appointment.spaceId.toString(),
});
```

## ✅ Como Funciona

1. **Agendamento é criado** → `AppointmentCreatedEvent` é disparado
2. **AppointmentCreatedHandler** é executado
3. **Notificação é enviada** para o usuário
4. **Auditoria é registrada** no banco de dados
5. **Logs são estruturados** para monitoramento

**Resultado**: Agendamento criado com todas as validações e eventos! 🎉

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
- Implementar cache de agendamentos

---

_Última atualização: $(date)_
_Versão: 1.0 - Padronizado_
