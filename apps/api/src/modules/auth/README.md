# Módulo de Autenticação

## 📋 **Visão Geral**

O módulo de autenticação implementa um sistema robusto de autenticação com JWT, cache Redis e integração com RBAC. O sistema oferece performance otimizada através de cache e segurança avançada com verificação de status do usuário.

## 🏗️ **Arquitetura**

### **Componentes Principais**

- **JWT Authentication**: Tokens de acesso e refresh
- **Redis Cache**: Cache de dados do usuário (5 minutos)
- **User Status Verification**: Verificação de usuário ativo
- **RBAC Integration**: Integração com sistema de autorização
- **Structured Logging**: Logs detalhados para auditoria

### **Fluxo de Autenticação**

```
1. Login → JWT Tokens → Cache User Data
2. Request → Verify JWT → Check Cache → Verify User Status
3. Authorization → Check Permissions → Allow/Deny
```

## 🔐 **Funcionalidades**

### **Autenticação**

- **Login**: Email/password → JWT tokens
- **Token Validation**: Verificação de JWT + status do usuário
- **Cache Management**: Cache Redis para performance
- **Logout**: Invalidação de token + limpeza de cache

### **Segurança**

- **JWT Tokens**: Access token (15min) + Refresh token (7 dias)
- **User Status**: Verificação de usuário ACTIVE
- **Soft Delete**: Proteção contra usuários deletados
- **Rate Limiting**: Proteção contra ataques de força bruta

### **Performance**

- **Cache Redis**: Dados do usuário cacheados por 5 minutos
- **Cache-First**: Verifica cache antes do banco
- **Auto-Invalidation**: Cache limpo quando usuário inativado
- **Structured Logs**: Logs diferenciados para cache vs banco

## 🛠️ **Como Usar**

### **1. Middleware de Autenticação**

```typescript
import { ensureAuthenticated } from '@/modules/auth/presentation/middlewares/authentication.middleware';

// Rota protegida
app.get('/protected', ensureAuthenticated, controller);

// Autenticação opcional
app.get('/public', optionalAuth, controller);
```

### **2. Integração com RBAC**

```typescript
import { ensureAuthenticated } from '@/modules/auth/presentation/middlewares/authentication.middleware';
import { requirePermission } from '@/modules/rbac/presentation/middlewares/authorization.middleware';

app.post(
  '/appointments',
  ensureAuthenticated, // Verifica JWT e status
  requirePermission('create'), // Verifica permissões
  controller,
);
```

### **3. Gerenciamento de Cache**

```typescript
import { invalidateUserCache } from '@/modules/auth/presentation/middlewares/authentication.middleware';

// Útil para logout ou atualização de perfil
await invalidateUserCache(userId);
```

## 📊 **Logs**

### **Sucesso (Cache Hit)**

```json
{
  "type": "authentication_success_cached",
  "userId": "user123",
  "userEmail": "user@example.com",
  "method": "GET",
  "url": "/api/protected"
}
```

### **Sucesso (Database Hit)**

```json
{
  "type": "authentication_success_db",
  "userId": "user123",
  "userEmail": "user@example.com",
  "method": "GET",
  "url": "/api/protected"
}
```

### **Cache Invalidado**

```json
{
  "type": "user_cache_invalidated",
  "userId": "user123"
}
```

### **Falha de Autenticação**

```json
{
  "type": "authentication_failed",
  "error": "User not found or inactive",
  "method": "GET",
  "url": "/api/protected"
}
```

## 🔄 **Endpoints**

### **POST /auth/authenticate**

- **Função**: Autenticar usuário
- **Cache**: Dados do usuário cacheados em Redis
- **Response**: JWT tokens + dados do usuário

### **POST /auth/logout**

- **Função**: Fazer logout
- **Cache**: Limpa cache do usuário
- **Security**: Invalida token atual

### **POST /auth/refresh-token**

- **Função**: Renovar access token
- **Cache**: Mantém cache do usuário
- **Security**: Usa refresh token válido

## 🚀 **Cache Redis**

### **Configuração**

- **TTL**: 5 minutos
- **Chave**: `auth:user:{userId}`
- **Dados**: `{id, name, email, role, status}`

### **Benefícios**

- ✅ **Performance**: Reduz consultas ao banco
- ✅ **Escalabilidade**: Cache compartilhado
- ✅ **Consistência**: Verificação de status
- ✅ **Segurança**: Auto-invalidação

### **Gerenciamento**

```typescript
// Cache automático no login
const user = await authenticateUser(email, password);
// Cache criado automaticamente

// Invalidação manual
await invalidateUserCache(userId);

// Invalidação automática
// - Usuário inativado
// - Usuário deletado
// - Logout
```

## 🔒 **Segurança**

### **JWT Tokens**

- **Access Token**: 15 minutos
- **Refresh Token**: 7 dias
- **Algorithm**: HS256
- **Claims**: userId, email, role

### **User Status Verification**

- **ACTIVE**: Usuário pode acessar
- **INACTIVE**: Usuário bloqueado
- **BLOCKED**: Usuário bloqueado
- **Soft Delete**: Proteção adicional

### **Rate Limiting**

- **Login**: 5 tentativas por minuto
- **Refresh**: 10 tentativas por minuto
- **Logout**: Sem limite

## 🧪 **Testando**

### **1. Login**

```bash
curl -X POST http://localhost:3333/api/auth/authenticate \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### **2. Acessar Rota Protegida**

```bash
curl -X GET http://localhost:3333/api/appointments \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### **3. Verificar Cache**

```bash
# Verificar se dados estão em cache
docker exec api redis-cli keys "auth:user:*"
```

## 🚨 **Troubleshooting**

### **Token Expired**

- Use refresh token para obter novo access token
- Cache é mantido durante refresh

### **User Not Found**

- Verificar se usuário existe no banco
- Verificar se status é ACTIVE
- Verificar se não foi soft deleted

### **Cache Issues**

- Verificar se Redis está rodando
- Verificar conectividade Redis
- Verificar logs de cache

### **Performance Issues**

- Verificar hit rate do cache
- Ajustar TTL se necessário
- Monitorar logs de performance

## 📈 **Monitoramento**

### **Métricas Importantes**

- **Cache Hit Rate**: % de hits no cache
- **Authentication Success Rate**: % de autenticações bem-sucedidas
- **Token Refresh Rate**: Frequência de refresh
- **Logout Rate**: Frequência de logout

### **Logs Estruturados**

- Todos os eventos são logados
- Logs diferenciados por origem (cache/banco)
- Informações de performance incluídas

---

_Última atualização: Cache Redis Implementado_ 🚀
