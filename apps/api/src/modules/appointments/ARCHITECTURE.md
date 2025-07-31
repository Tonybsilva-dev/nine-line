# 📋 Arquitetura do Módulo Appointments

## 🎯 Visão Geral

O módulo `appointments` é responsável por gerenciar os agendamentos de espaços, permitindo que usuários agendem o uso de um espaço em uma data e horário específicos.

## 🏗️ Estrutura Clean Architecture

```
appointments/
├── domain/                    # Regras de negócio
│   ├── entities/             # Entidades do domínio
│   │   ├── appointment.ts
│   │   └── index.ts
│   ├── repositories/         # Interfaces dos repositórios
│   │   ├── appointment-repository.ts
│   │   └── index.ts
│   └── events/              # Eventos do domínio
│       ├── appointment-created.event.ts
│       ├── appointment-updated.event.ts
│       ├── appointment-deleted.event.ts
│       ├── appointment-approved.event.ts
│       ├── appointment-rejected.event.ts
│       └── index.ts
├── application/              # Casos de uso
│   ├── use-cases/
│   │   ├── create-appointment/      # Caso de uso de criar agendamento
│   │   ├── find-appointment/        # Casos de uso de buscar agendamento
│   │   ├── update-appointment/      # Caso de uso de atualizar agendamento
│   │   ├── delete-appointment/      # Caso de uso de deletar agendamento
│   │   ├── approve-appointment/     # Caso de uso de aprovar agendamento
│   │   ├── reject-appointment/      # Caso de uso de rejeitar agendamento
│   │   └── index.ts
│   └── events/              # Event handlers
│       ├── appointment-created.handler.ts
│       ├── appointment-updated.handler.ts
│       ├── appointment-deleted.handler.ts
│       ├── appointment-events.config.ts
│       └── index.ts
├── presentation/             # Camada de apresentação
│   ├── controllers/         # Controllers HTTP
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
│   ├── routes/              # Rotas HTTP
│   │   └── appointment-routes.ts
│   ├── validators/          # Validações de entrada
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
│   ├── middlewares/         # Middlewares específicos
│   │   ├── appointment-rate-limit.middleware.ts
│   │   └── index.ts
│   ├── docs/                # Documentação Swagger
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
└── infra/                   # Implementações externas
    └── repositories/        # Implementações dos repositórios
        ├── prisma-appointment.repository.ts
        └── index.ts
```

## 🔄 Fluxo de Dados

### 1. Criação de Agendamento

```
Request → Validator → Rate Limit → Controller → Use Case → Repository → Event → Handler → Response
```

### 2. Aprovação/Rejeição de Agendamento

```
Request → Auth → Validator → Rate Limit → Controller → Use Case → Repository → Event → Handler → Response
```

### 3. Event-Driven Operations

```
Domain Event → Event Handler → Use Case → Repository → Service → Log
```

## 🎯 Responsabilidades por Camada

### Domain

- **Entities**: Regras de negócio dos agendamentos
- **Repositories**: Interfaces para acesso a dados
- **Events**: Eventos do domínio (created, updated, deleted, approved, rejected)

### Application

- **Use Cases**: Lógica de aplicação (CRUD operations, approve/reject)
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

- **Create Appointment**: 5 requests por minuto por IP
- **Update Appointment**: 3 requests por minuto por IP
- **Delete Appointment**: 2 requests por minuto por IP
- **Approve/Reject**: 3 requests por minuto por IP
- **Middleware**: `appointmentRateLimit`

### Autorização

- **Create**: `appointments:create` (autenticado)
- **Read**: `appointments:read` (autenticado)
- **Update**: `appointments:update` (autenticado)
- **Delete**: `appointments:delete` (autenticado)
- **Approve/Reject**: `appointments:approve` (administrador)

### Validações

- **Create**: Dados do agendamento
- **Update**: Campos opcionais
- **Find**: ID UUID
- **Delete**: ID UUID
- **List**: Paginação e filtros
- **Approve/Reject**: ID UUID

## 📊 Métricas

### Logs Estruturados

- `appointment_created`
- `appointment_updated`
- `appointment_deleted`
- `appointment_approved`
- `appointment_rejected`
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
APPOINTMENT_MIN_DURATION=30
APPOINTMENT_MAX_DURATION=480
APPOINTMENT_RATE_LIMIT_CREATE=5
APPOINTMENT_RATE_LIMIT_UPDATE=3
APPOINTMENT_RATE_LIMIT_DELETE=2
APPOINTMENT_RATE_LIMIT_APPROVE=3
```

## 📈 Monitoramento

### Health Checks

- ✅ Database connectivity
- ✅ Appointment validation
- ✅ Conflict detection

### Alertas

- ❌ Failed appointment operations
- ❌ Rate limit exceeded
- ❌ Validation errors

## 🚀 Deploy

### Dependências

- PostgreSQL (appointments)
- Prisma (ORM)

### Migrations

- ✅ Appointments table

## 🎯 Eventos

### AppointmentCreatedEvent

- Dispara notificação para o usuário
- Cria registro de auditoria
- Logs estruturados

### AppointmentUpdatedEvent

- Dispara notificação para o usuário
- Registra auditoria
- Logs estruturados

### AppointmentDeletedEvent

- Dispara notificação para o usuário
- Registra auditoria
- Logs estruturados

### AppointmentApprovedEvent

- Dispara notificação para o usuário
- Registra auditoria
- Logs estruturados

### AppointmentRejectedEvent

- Dispara notificação para o usuário
- Registra auditoria
- Logs estruturados

## 🔄 Integrações

### Módulo Users

- Usuário que fez o agendamento
- Verificação de status

### Módulo Spaces

- Espaço agendado
- Verificação de disponibilidade

### Módulo Notifications

- Notificações de agendamento
- Alertas de conflitos

### Módulo RBAC

- Controle de acesso
- Permissões granulares

---

_Última atualização: $(date)_
_Versão: 1.0_
