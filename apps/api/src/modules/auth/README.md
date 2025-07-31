# Módulo de Autenticação

Este módulo gerencia a autenticação da aplicação, incluindo login, logout, refresh token e controle de sessões.

## 🎯 Funcionalidade Principal

**Sistema completo de autenticação** com JWT, refresh tokens, blacklist de tokens e controle de sessões seguras.

## 📁 Estrutura do Módulo (Padronizada)

```
auth/
├── domain/
│   └── entities/
│       ├── refresh-token.ts      # Entidade de refresh token
│       └── index.ts
├── application/
│   └── use-cases/
│       ├── authenticate/          # Caso de uso de autenticação
│       ├── refresh-token/         # Caso de uso de refresh token
│       ├── logout/                # Caso de uso de logout
│       └── index.ts
├── presentation/
│   ├── controllers/
│   │   ├── authenticate.controller.ts
│   │   ├── refresh-token.controller.ts
│   │   ├── logout.controller.ts
│   │   └── index.ts
│   ├── routes/
│   │   └── auth.routes.ts
│   ├── validators/
│   │   ├── auth.validators.ts
│   │   ├── login.validator.ts
│   │   ├── refresh-token.validator.ts
│   │   ├── logout.validator.ts
│   │   └── index.ts
│   ├── middlewares/
│   │   ├── ensure-authenticated.ts
│   │   ├── check-blacklist.ts
│   │   ├── auth-rate-limit.middleware.ts
│   │   └── index.ts
│   ├── docs/
│   │   ├── authenticate.doc.ts
│   │   ├── refresh-token.doc.ts
│   │   ├── logout.doc.ts
│   │   └── index.ts
│   └── index.ts
└── infra/
    └── repositories/
        ├── refresh-token.repository.ts
        ├── token-blacklist.repository.ts
        └── index.ts
```

## 🔒 Segurança Implementada

### Rate Limiting

- **Login**: 3 requests por 5 minutos por IP
- **Refresh Token**: 5 requests por 5 minutos por IP
- **Middleware**: `authRateLimit`

### Validações

- ✅ **Login**: Validação de email e senha
- ✅ **Refresh Token**: Validação de refresh token
- ✅ **Logout**: Validação de refresh token

### Autorização

- **Login**: Público
- **Refresh Token**: Público (com validação)
- **Logout**: Autenticado

### Middlewares de Segurança

- **ensure-authenticated**: Verifica se o usuário está autenticado
- **check-blacklist**: Verifica se o token está na blacklist
- **auth-rate-limit**: Rate limiting específico para auth

## 🔐 Tipos de Token

### JWT Access Token

- **Duração**: 15 minutos
- **Conteúdo**: User ID, roles, permissions
- **Uso**: Autenticação em endpoints protegidos

### Refresh Token

- **Duração**: 7 dias
- **Conteúdo**: User ID, token ID
- **Uso**: Renovação de access tokens

### Token Blacklist

- **Armazenamento**: Redis/PostgreSQL
- **Uso**: Invalidação de tokens revogados

## ⚙️ Configuração

### Variáveis de Ambiente

```env
# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Rate Limiting
AUTH_RATE_LIMIT_LOGIN=3
AUTH_RATE_LIMIT_REFRESH=5
AUTH_RATE_LIMIT_WINDOW=300000
```

### Configuração de Eventos

```typescript
// ✅ Simples e direto
import { configureAuthEvents } from '@/modules/auth';

configureAuthEvents(eventBus);
```

## 🎯 Handlers Disponíveis

### AuthSuccessHandler ✅

- **Função**: Processa eventos quando autenticação é bem-sucedida
- **Ações**: Logs, auditoria, cache invalidation

### AuthFailedHandler

- **Função**: Processa eventos quando autenticação falha
- **Ações**: Logs, auditoria, rate limiting

### TokenRevokedHandler

- **Função**: Processa eventos quando token é revogado
- **Ações**: Logs, auditoria, blacklist

## 📊 Endpoints Disponíveis

### POST /auth/login

- **Função**: Autenticar usuário
- **Validação**: Email e senha
- **Rate Limit**: 3 requests/5 minutos
- **Público**: Sim

### POST /auth/refresh

- **Função**: Renovar access token
- **Validação**: Refresh token válido
- **Rate Limit**: 5 requests/5 minutos
- **Público**: Sim

### POST /auth/logout

- **Função**: Fazer logout e revogar tokens
- **Validação**: Refresh token
- **Autenticação**: Obrigatória

## 🗄️ Banco de Dados

### Tabelas

- **refresh_tokens**: Refresh tokens dos usuários
- **token_blacklist**: Tokens revogados

### Relacionamentos

- `RefreshToken` → `User` (proprietário)
- `TokenBlacklist` → `User` (proprietário)

## 🎯 Eventos Integrados

### AuthSuccessEvent ✅

- ✅ Dispara notificação de login bem-sucedido
- ✅ Cria registro de auditoria
- ✅ Logs estruturados

### AuthFailedEvent

- ✅ Registra tentativa de login falhada
- ✅ Logs estruturados
- ✅ Rate limiting

### TokenRevokedEvent

- ✅ Adiciona token à blacklist
- ✅ Registra auditoria
- ✅ Logs estruturados

## 🔍 Troubleshooting

### Login falhou

- Verificar se o email e senha estão corretos
- Verificar se o usuário está ativo
- Verificar se não excedeu o rate limit
- Verificar logs de auditoria

### Refresh token inválido

- Verificar se o token não expirou
- Verificar se o token não está na blacklist
- Verificar se o token pertence ao usuário
- Verificar logs de auditoria

### Rate Limit Exceeded

- Verificar se o IP não excedeu o limite
- Aguardar o reset da janela de tempo
- Verificar logs de rate limiting

### Validação falhou

- Verificar se o email é válido
- Verificar se a senha tem pelo menos 6 caracteres
- Verificar se o refresh token tem pelo menos 10 caracteres

## 📈 Logs

Todos os handlers registram logs estruturados:

```typescript
logger.info({
  type: 'auth_success_handler',
  eventId: event.eventId,
  userId: event.user.id.toString(),
  userEmail: event.user.email,
});
```

## ✅ Como Funciona

1. **Usuário faz login** → `AuthSuccessEvent` é disparado
2. **AuthSuccessHandler** é executado
3. **Notificação é enviada** para o usuário
4. **Auditoria é registrada** no banco de dados
5. **Logs são estruturados** para monitoramento

**Resultado**: Usuário autenticado com todas as validações e eventos! 🎉

## 📋 Status de Padronização

### ✅ Implementado

- ✅ Estrutura Clean Architecture completa
- ✅ README.md detalhado
- ✅ index.ts com exports organizados
- ✅ Validações para todos os endpoints
- ✅ Middleware de rate limiting
- ✅ Documentação Swagger
- ✅ Logs estruturados
- ✅ Middlewares de segurança

### 🎯 Próximos Passos

- Implementar testes para middlewares
- Implementar testes para use cases
- Adicionar métricas de monitoramento
- Implementar cache de tokens

---

_Última atualização: $(date)_
_Versão: 1.0 - Padronizado_
