# Módulo de Notificações

Este módulo gerencia as notificações da aplicação, permitindo o envio de emails para os usuários.

## 🎯 Funcionalidade Principal

**Enviar email de boas-vindas quando um usuário é criado**, assim como acontece no `create-appointment`.

## 📁 Estrutura do Módulo

```
notifications/
├── domain/
│   ├── entities/
│   │   ├── notification.ts              # Entidade de notificação
│   │   ├── notification-template.ts     # Template de notificação
│   │   └── user-notification-settings.ts # Configurações do usuário
│   └── repositories/
│       ├── notification-repository.ts
│       ├── notification-template-repository.ts
│       └── user-notification-settings-repository.ts
├── application/
│   ├── use-cases/
│   │   └── send-notification/
│   └── events/
│       ├── user-created.handler.ts      # ✅ Email de boas-vindas
│       ├── appointment-created.handler.ts # Notifica host sobre agendamento
│       ├── appointment-approved.handler.ts # Notifica usuário sobre aprovação
│       ├── appointment-cancelled.handler.ts # Notifica sobre cancelamento
│       └── notification-events.config.ts # Configuração centralizada
├── infra/
│   ├── services/
│   │   ├── email.service.ts             # Serviço de email
│   │   └── queue.service.ts             # Serviço de fila
│   ├── templates/
│   │   └── email/                       # Templates Handlebars
│   └── seeders/
│       └── notification-template-seeder.ts
└── presentation/
    ├── controllers/
    ├── routes/
    └── validators/
```

## 📧 Tipos de Notificação

### Email

- **Boas-vindas**: Enviado quando um usuário se cadastra ✅
- **Agendamento Pendente**: Notifica o host sobre novo agendamento
- **Agendamento Aprovado**: Notifica o usuário sobre aprovação
- **Agendamento Cancelado**: Notifica sobre cancelamento

## ⚙️ Configuração

### Variáveis de Ambiente

```env
# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
EMAIL_FROM=noreply@nineline.com

# URLs
APP_URL=http://localhost:3000
```

### Configuração de Eventos

```typescript
// ✅ Simples e direto
import { configureNotificationEvents } from '@/modules/notifications';

configureNotificationEvents(eventBus);
```

## 🎯 Handlers Disponíveis

### UserCreatedNotificationHandler ✅

- **Função**: Envia email de boas-vindas quando usuário é criado
- **Template**: `welcome-email`
- **Variáveis**: `userName`, `userEmail`, `appUrl`

### AppointmentCreatedNotificationHandler

- **Função**: Notifica o host sobre novo agendamento
- **Template**: `appointment-pending-approval`

### AppointmentApprovedNotificationHandler

- **Função**: Notifica o usuário sobre aprovação
- **Template**: `appointment-approved`

## 📊 Templates Disponíveis

### welcome-email ✅

- **Tipo:** EMAIL
- **Assunto:** "Bem-vindo ao Nine Line!"
- **Variáveis:** `userName`, `userEmail`, `appUrl`
- **Uso:** Enviado quando um usuário se cadastra

### appointment-pending-approval

- **Tipo:** EMAIL
- **Assunto:** "Novo Agendamento Pendente"
- **Variáveis:** `appointmentId`, `spaceTitle`, `userName`, `appointmentDate`, `startTime`, `endTime`, `adminUrl`
- **Uso:** Notifica o host sobre novo agendamento pendente

## 🗄️ Banco de Dados

### Tabelas

- **notification_templates**: Templates de notificação
- **notifications**: Histórico de notificações enviadas

### Relacionamentos

- `Notification` → `NotificationTemplate` (cada notificação usa um template)

## 🎯 Eventos Integrados

### UserCreatedEvent ✅

- ✅ Envia email de boas-vindas
- ✅ Cria registro de notificação no banco
- ✅ Logs estruturados

### AppointmentCreatedEvent

- ✅ Notifica o host sobre novo agendamento pendente

### AppointmentApprovedEvent

- ✅ Notifica o usuário sobre aprovação

## 🔍 Troubleshooting

### Email não enviado

- Verificar configurações SMTP
- Verificar se o template `welcome-email` existe no banco
- Verificar logs de erro

### Template não encontrado

- Verificar se o template foi criado pelo seeder
- Verificar se o nome do template está correto (`welcome-email`)

## 📈 Logs

Todos os handlers registram logs estruturados:

```typescript
logger.info({
  type: 'user_created_notification_handler',
  eventId: event.eventId,
  userId: event.user.id.toString(),
  userEmail: event.user.email,
});
```

## ✅ Como Funciona

1. **Usuário é criado** → `UserCreatedEvent` é disparado
2. **UserCreatedNotificationHandler** é executado
3. **Template `welcome-email`** é buscado no banco
4. **Email é enviado** via SMTP
5. **Registro é criado** na tabela `notifications`

**Resultado**: Usuário recebe email de boas-vindas! 🎉
