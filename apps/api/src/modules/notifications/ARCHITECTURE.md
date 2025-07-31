# 📋 Arquitetura do Módulo Notifications

## 🎯 Visão Geral

O módulo `notifications` é responsável por gerenciar o sistema de notificações da aplicação, incluindo envio de emails, templates e histórico de notificações.

## 🏗️ Estrutura Clean Architecture

```
notifications/
├── domain/                    # Regras de negócio
│   ├── entities/             # Entidades do domínio
│   │   ├── notification.ts
│   │   ├── notification-template.ts
│   │   └── user-notification-settings.ts
│   ├── repositories/         # Interfaces dos repositórios
│   │   ├── notification-repository.ts
│   │   ├── notification-template-repository.ts
│   │   └── user-notification-settings-repository.ts
│   └── events/              # Eventos do domínio
│       └── index.ts
├── application/              # Casos de uso
│   ├── use-cases/
│   │   └── send-notification/
│   └── events/              # Event handlers
│       ├── user-created.handler.ts
│       ├── appointment-created.handler.ts
│       ├── appointment-approved.handler.ts
│       ├── appointment-cancelled.handler.ts
│       └── notification-events.config.ts
├── presentation/             # Camada de apresentação
│   ├── controllers/         # Controllers HTTP
│   │   ├── send-notification.controller.ts
│   │   ├── list-notifications.controller.ts
│   │   ├── list-templates.controller.ts
│   │   ├── get-notification.controller.ts
│   │   └── index.ts
│   ├── routes/              # Rotas HTTP
│   │   └── notification.routes.ts
│   ├── validators/          # Validações de entrada
│   │   ├── send-notification.validator.ts
│   │   ├── list-notifications.validator.ts
│   │   ├── get-notification.validator.ts
│   │   ├── list-templates.validator.ts
│   │   └── index.ts
│   ├── middlewares/         # Middlewares específicos
│   │   ├── notification-rate-limit.middleware.ts
│   │   └── index.ts
│   ├── docs/                # Documentação Swagger
│   │   ├── send-notification.doc.ts
│   │   ├── list-notifications.doc.ts
│   │   ├── list-templates.doc.ts
│   │   ├── get-notification-by-id.doc.ts
│   │   └── index.ts
│   └── index.ts
└── infra/                   # Implementações externas
    ├── repositories/        # Implementações dos repositórios
    │   ├── prisma-notification.repository.ts
    │   ├── prisma-notification-template.repository.ts
    │   └── prisma-user-notification-settings.repository.ts
    ├── services/           # Serviços externos
    │   ├── email.service.ts
    │   ├── smtp-email.service.ts
    │   └── queue.service.ts
    ├── templates/          # Templates de email
    │   └── email/
    │       ├── welcome.hbs
    │       ├── appointment-pending.hbs
    │       ├── appointment-approved.hbs
    │       ├── appointment-cancelled.hbs
    │       └── appointment-approved-host.hbs
    └── seeders/           # Seeders de dados
        ├── notification-template-seeder.ts
        └── notification-seeder.ts
```

## 🔄 Fluxo de Dados

### 1. Envio de Notificação

```
Request → Validator → Rate Limit → Auth → Controller → Use Case → Repository → Service → Response
```

### 2. Event-Driven Notifications

```
Domain Event → Event Handler → Use Case → Repository → Service → Log
```

## 🎯 Responsabilidades por Camada

### Domain

- **Entities**: Regras de negócio das notificações
- **Repositories**: Interfaces para acesso a dados
- **Events**: Eventos do domínio

### Application

- **Use Cases**: Lógica de aplicação
- **Events**: Handlers de eventos

### Presentation

- **Controllers**: Endpoints HTTP
- **Routes**: Definição de rotas
- **Validators**: Validação de entrada
- **Middlewares**: Rate limiting, auth
- **Docs**: Documentação Swagger

### Infrastructure

- **Repositories**: Implementação Prisma
- **Services**: Email, filas
- **Templates**: Handlebars templates
- **Seeders**: Dados iniciais

## 🔒 Segurança

### Rate Limiting

- **Endpoint**: `/notifications/send`
- **Limite**: 5 requests por minuto por usuário
- **Middleware**: `notificationRateLimit`

### Autorização

- **Send**: `notifications:send`
- **Read**: `notifications:read`
- **Templates**: `notifications:templates:read`

## 📊 Métricas

### Logs Estruturados

- `notification_sent`
- `notification_failed`
- `rate_limit_exceeded`
- `template_not_found`

## 🧪 Testes

### Cobertura

- ✅ Use Cases
- ✅ Controllers
- ✅ Validators
- ❌ Middlewares (pendente)
- ❌ Services (pendente)

## 🔧 Configuração

### Variáveis de Ambiente

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
EMAIL_FROM=noreply@nineline.com
```

## 📈 Monitoramento

### Health Checks

- ✅ Database connectivity
- ✅ SMTP connectivity
- ✅ Template availability

### Alertas

- ❌ Failed notifications
- ❌ Rate limit exceeded
- ❌ SMTP errors

## 🚀 Deploy

### Dependências

- PostgreSQL (notifications, notification_templates)
- Redis (rate limiting cache)
- SMTP Server

### Migrations

- ✅ Notification templates
- ✅ Notifications table
- ✅ User notification settings

---

_Última atualização: $(date)_
_Versão: 1.0_
