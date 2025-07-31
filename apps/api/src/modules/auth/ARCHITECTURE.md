# 📋 Arquitetura do Módulo Auth

## 🎯 Visão Geral

O módulo `auth` é responsável por gerenciar a autenticação da aplicação, incluindo login, logout, refresh token e controle de sessões seguras.

## 🏗️ Estrutura Clean Architecture

```
auth/
├── domain/                    # Regras de negócio
│   └── entities/             # Entidades do domínio
│       ├── refresh-token.ts
│       └── index.ts
├── application/              # Casos de uso
│   └── use-cases/
│       ├── authenticate/      # Caso de uso de autenticação
│       ├── refresh-token/     # Caso de uso de refresh token
│       ├── logout/            # Caso de uso de logout
│       └── index.ts
├── presentation/             # Camada de apresentação
│   ├── controllers/         # Controllers HTTP
│   │   ├── authenticate.controller.ts
│   │   ├── refresh-token.controller.ts
│   │   ├── logout.controller.ts
│   │   └── index.ts
│   ├── routes/              # Rotas HTTP
│   │   └── auth.routes.ts
│   ├── validators/          # Validações de entrada
│   │   ├── auth.validators.ts
│   │   ├── login.validator.ts
│   │   ├── refresh-token.validator.ts
│   │   ├── logout.validator.ts
│   │   └── index.ts
│   ├── middlewares/         # Middlewares específicos
│   │   ├── ensure-authenticated.ts
│   │   ├── check-blacklist.ts
│   │   ├── auth-rate-limit.middleware.ts
│   │   └── index.ts
│   ├── docs/                # Documentação Swagger
│   │   ├── authenticate.doc.ts
│   │   ├── refresh-token.doc.ts
│   │   ├── logout.doc.ts
│   │   └── index.ts
│   └── index.ts
└── infra/                   # Implementações externas
    └── repositories/        # Implementações dos repositórios
        ├── refresh-token.repository.ts
        ├── token-blacklist.repository.ts
        └── index.ts
```

## 🔄 Fluxo de Dados

### 1. Autenticação (Login)

```
Request → Validator → Rate Limit → Controller → Use Case → Repository → JWT Generation → Response
```

### 2. Refresh Token

```
Request → Validator → Rate Limit → Controller → Use Case → Repository → JWT Validation → Response
```

### 3. Logout

```
Request → Validator → Controller → Use Case → Repository → Blacklist Token → Response
```

## 🎯 Responsabilidades por Camada

### Domain

- **Entities**: Regras de negócio dos tokens
- **Repositories**: Interfaces para acesso a dados

### Application

- **Use Cases**: Lógica de aplicação (authentication, refresh, logout)

### Presentation

- **Controllers**: Endpoints HTTP
- **Routes**: Definição de rotas com middlewares
- **Validators**: Validação de entrada com Zod
- **Middlewares**: Rate limiting e segurança
- **Docs**: Documentação Swagger

### Infrastructure

- **Repositories**: Implementação Prisma

## 🔒 Segurança

### Rate Limiting

- **Login**: 3 requests por 5 minutos por IP
- **Refresh Token**: 5 requests por 5 minutos por IP
- **Middleware**: `authRateLimit`

### Autorização

- **Login**: Público
- **Refresh Token**: Público (com validação)
- **Logout**: Autenticado

### Validações

- **Login**: Email e senha
- **Refresh Token**: Token válido
- **Logout**: Token válido

### Middlewares de Segurança

- **ensure-authenticated**: Verifica se o usuário está autenticado
- **check-blacklist**: Verifica se o token está na blacklist
- **auth-rate-limit**: Rate limiting específico para auth

## 📊 Métricas

### Logs Estruturados

- `auth_success`
- `auth_failed`
- `token_refreshed`
- `token_revoked`
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
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
AUTH_RATE_LIMIT_LOGIN=3
AUTH_RATE_LIMIT_REFRESH=5
AUTH_RATE_LIMIT_WINDOW=300000
```

## 📈 Monitoramento

### Health Checks

- ✅ JWT validation
- ✅ Database connectivity
- ✅ Token blacklist

### Alertas

- ❌ Failed authentication attempts
- ❌ Rate limit exceeded
- ❌ Token validation errors

## 🚀 Deploy

### Dependências

- PostgreSQL (refresh_tokens, token_blacklist)
- JWT (authentication)
- bcrypt (password hashing)

### Migrations

- ✅ Refresh tokens table
- ✅ Token blacklist table

## 🎯 Eventos

### AuthSuccessEvent

- Dispara notificação de login bem-sucedido
- Cria registro de auditoria
- Logs estruturados

### AuthFailedEvent

- Registra tentativa de login falhada
- Logs estruturados
- Rate limiting

### TokenRevokedEvent

- Adiciona token à blacklist
- Registra auditoria
- Logs estruturados

## 🔄 Integrações

### Módulo Users

- Validação de usuário
- Verificação de status

### Módulo RBAC

- Controle de acesso baseado em roles
- Permissões granulares

### Módulo Notifications

- Notificações de login
- Alertas de segurança

---

_Última atualização: $(date)_
_Versão: 1.0_
