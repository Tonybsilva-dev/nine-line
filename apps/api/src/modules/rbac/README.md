# Sistema RBAC (Role-Based Access Control)

## 📋 **Visão Geral**

O sistema RBAC implementa controle de acesso baseado em roles e permissões, permitindo granularidade no controle de acesso às funcionalidades da aplicação.

## 🏗️ **Arquitetura**

### **Entidades Principais**

- **Role**: Define um papel no sistema (USER, MANAGER, ADMIN)
- **Permission**: Define uma permissão específica (ex: `appointment:create`)
- **UserRoleAssignment**: Associa um usuário a uma role
- **RolePermission**: Associa uma role a uma permissão

### **Hierarquia de Roles**

```
ADMIN (Level 2) > MANAGER (Level 1) > USER (Level 0)
```

## 🔐 **Sistema de Permissões**

### **Formato das Permissões**

```
{recurso}:{ação}
```

**Exemplos:**

- `appointment:create` - Criar agendamentos
- `appointment:read:own` - Ler próprios agendamentos
- `appointment:read:all` - Ler todos os agendamentos
- `user:update:own` - Atualizar próprio perfil
- `user:delete` - Deletar usuários (admin)

### **Permissões por Recurso**

#### **Appointments**

- `create` - Criar agendamento
- `read:own` - Ver próprios agendamentos
- `read:all` - Ver todos os agendamentos
- `update:own` - Atualizar próprio agendamento
- `update:all` - Atualizar qualquer agendamento
- `delete:own` - Deletar próprio agendamento
- `delete:all` - Deletar qualquer agendamento
- `approve` - Aprovar agendamentos
- `reject` - Rejeitar agendamentos
- `cancel:own` - Cancelar próprio agendamento
- `cancel:all` - Cancelar qualquer agendamento

#### **Users**

- `create` - Criar usuário (registro)
- `read:own` - Ver próprio perfil
- `read:all` - Ver todos os usuários
- `update:own` - Atualizar próprio perfil
- `update:all` - Atualizar qualquer usuário
- `delete` - Deletar usuários
- `block` - Bloquear usuários
- `unblock` - Desbloquear usuários

#### **Spaces**

- `create` - Criar espaço
- `read` - Ver espaços
- `update:own` - Atualizar próprio espaço
- `update:all` - Atualizar qualquer espaço
- `delete:own` - Deletar próprio espaço
- `delete:all` - Deletar qualquer espaço

#### **Ratings**

- `create` - Criar avaliação
- `read` - Ver avaliações
- `update:own` - Atualizar própria avaliação
- `update:all` - Atualizar qualquer avaliação
- `delete:own` - Deletar própria avaliação
- `delete:all` - Deletar qualquer avaliação

#### **RBAC**

- `role:assign` - Atribuir roles
- `role:revoke` - Revogar roles
- `role:create` - Criar roles
- `role:update` - Atualizar roles
- `role:delete` - Deletar roles
- `permission:assign` - Atribuir permissões
- `permission:revoke` - Revogar permissões
- `permission:create` - Criar permissões
- `permission:update` - Atualizar permissões
- `permission:delete` - Deletar permissões

## 🛠️ **Como Usar**

### **1. Middleware de Autenticação**

```typescript
import { ensureAuthenticated } from '@/modules/auth/presentation/middlewares/authentication.middleware';

// Aplicar em rotas que requerem autenticação
app.get('/protected', ensureAuthenticated, controller);
```

### **2. Middleware de Autorização**

```typescript
import {
  requirePermission,
  requireUserRole,
  requireManagerRole,
  requireAdminRole,
  requireAppointmentPermission,
  requireUserPermission,
} from '@/modules/rbac/presentation/middlewares/authorization.middleware';

// Verificar permissão específica
app.post(
  '/appointments',
  ensureAuthenticated,
  requireAppointmentPermission('create'),
  controller,
);

// Verificar nível de role
app.get('/admin/users', ensureAuthenticated, requireAdminRole(), controller);

// Verificar permissão de recurso
app.put(
  '/users/:id',
  ensureAuthenticated,
  requireUserPermission('update:own'),
  controller,
);
```

### **3. Verificação Programática**

```typescript
import { AuthorizationService } from '@/modules/rbac/domain/services/authorization.service';

const authService = new AuthorizationService(roleRepo, userRoleRepo);

// Verificar se usuário tem permissão
const hasPermission = await authService.hasPermission(
  userId,
  'appointment:create',
);

// Verificar acesso a recurso
const canAccess = await authService.canAccessResource(
  userId,
  'appointment',
  'create',
);

// Verificar nível de role
await authService.requireRoleLevel(userId, 1); // Manager ou superior
```

## 🔄 **Fluxo de Autorização**

1. **Autenticação**: Middleware `ensureAuthenticated` verifica JWT
2. **Cache Redis**: Verifica cache antes de consultar banco
3. **Autorização**: Middleware `requirePermission` verifica permissões
4. **Cache**: Permissões são cacheadas por 5 minutos
5. **Logs**: Todas as tentativas são logadas

## 🚀 **Cache Redis**

### **Autenticação com Cache**

O middleware `ensureAuthenticated` implementa cache Redis para otimizar performance:

- **Cache TTL**: 5 minutos
- **Chave**: `auth:user:{userId}`
- **Dados**: Informações do usuário (id, name, email, role, status)
- **Invalidação**: Automática quando usuário é inativado

### **Benefícios do Cache**

- ✅ **Performance**: Reduz consultas ao banco de dados
- ✅ **Escalabilidade**: Suporta múltiplas instâncias
- ✅ **Consistência**: Verifica status do usuário em cache
- ✅ **Segurança**: Invalida cache quando usuário é inativado

### **Invalidar Cache**

```typescript
import { invalidateUserCache } from '@/modules/auth/presentation/middlewares/authentication.middleware';

// Útil para logout ou atualização de perfil
await invalidateUserCache(userId);
```

## 📊 **Logs**

### **Sucesso (Cache)**

```json
{
  "type": "authentication_success_cached",
  "userId": "user123",
  "userEmail": "user@example.com",
  "method": "POST",
  "url": "/api/appointments"
}
```

### **Sucesso (Banco)**

```json
{
  "type": "authentication_success_db",
  "userId": "user123",
  "userEmail": "user@example.com",
  "method": "POST",
  "url": "/api/appointments"
}
```

### **Autorização Sucesso**

```json
{
  "type": "authorization_success",
  "userId": "user123",
  "permission": "appointment:create",
  "method": "POST",
  "url": "/api/appointments"
}
```

### **Falha**

```json
{
  "type": "authorization_failed",
  "userId": "user123",
  "error": "User does not have permission: appointment:create",
  "method": "POST",
  "url": "/api/appointments"
}
```

### **Cache Invalidado**

```json
{
  "type": "user_cache_invalidated",
  "userId": "user123"
}
```

## 🧪 **Testando**

### **1. Executar Seeders**

```bash
# Criar roles e permissões
npx tsx src/modules/rbac/infra/seeders/rbac-seeder.ts

# Associar roles aos usuários existentes
npx tsx src/modules/rbac/infra/seeders/assign-roles-to-users.ts
```

### **2. Verificar Permissões**

```bash
# Verificar roles criadas
docker exec api npx tsx -e "
import { prisma } from './src/config/prisma';
const roles = await prisma.role.findMany();
console.log('Roles:', roles.map(r => r.name));
"

# Verificar assignments
docker exec api npx tsx -e "
import { prisma } from './src/config/prisma';
const assignments = await prisma.userRoleAssignment.findMany({
  include: { user: true, role: true }
});
console.log('Assignments:', assignments.map(a => \`\${a.user.email} -> \${a.role.name}\`));
"
```

## 🚀 **Próximos Passos**

- [ ] Implementar cache Redis para permissões
- [ ] Adicionar middleware para verificação de propriedade (own vs all)
- [ ] Criar testes automatizados
- [ ] Implementar auditoria de acesso
- [ ] Adicionar interface de gerenciamento de roles
