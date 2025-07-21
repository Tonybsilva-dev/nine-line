# Configuração do Redis

## Visão Geral

O Redis é usado para cache e sessões na API pool-appointment-api. Esta documentação explica como configurar e usar o Redis.

## Configuração Inicial

### 1. Variáveis de Ambiente

Adicione ao seu arquivo `.env`:

```env
# Redis Configuration
REDIS_URL="redis://localhost:6379"
```

### 2. Instalação Local

#### Opção A: Docker (Recomendado)

```bash
# Iniciar Redis com Docker Compose
docker-compose -f docker-compose.redis.yml up -d

# Verificar se está rodando
docker ps | grep redis
```

#### Opção B: Instalação Local

**macOS (Homebrew):**

```bash
brew install redis
brew services start redis
```

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

**Windows:**

- Baixe o Redis para Windows
- Execute `redis-server.exe`

### 3. Verificação

```bash
# Testar conexão
redis-cli ping
# Deve retornar: PONG
```

## Configuração da Aplicação

### 1. Dependências

O Redis já está configurado no `package.json`:

```json
{
  "dependencies": {
    "ioredis": "^5.3.2"
  }
}
```

### 2. Configuração Automática

A aplicação configura automaticamente o Redis com:

- **Retry automático**: 3 tentativas por request
- **Conexão lazy**: Só conecta quando necessário
- **Keep-alive**: 30 segundos
- **Timeouts**: 10s para conexão, 5s para comandos
- **Logs estruturados**: Todos os eventos são logados

### 3. Health Check

O endpoint `/api/health` verifica automaticamente:

- Conexão com Redis
- Ping/Pong
- Status de conectividade

## Uso na Aplicação

### 1. Cache Básico

```typescript
import { getCache, setCache, deleteCache } from '../config/redis';

// Salvar no cache
await setCache('user:123', userData, 3600); // TTL de 1 hora

// Buscar do cache
const userData = await getCache('user:123');

// Deletar do cache
await deleteCache('user:123');
```

### 2. Verificar Disponibilidade

```typescript
import { isRedisAvailable } from '../config/redis';

if (isRedisAvailable()) {
  // Redis está disponível
} else {
  // Fallback para banco de dados
}
```

### 3. Logs de Performance

O sistema automaticamente loga:

- **Conexões**: Sucesso/falha
- **Queries lentas**: >100ms
- **Erros**: Detalhes completos
- **Reconexões**: Tentativas automáticas

## Monitoramento

### 1. Logs Disponíveis

```bash
# Ver logs do Redis
docker logs pool-appointment-redis

# Ver logs da aplicação
npm run dev
```

### 2. Métricas Importantes

- **Conexões ativas**
- **Comandos por segundo**
- **Uso de memória**
- **Tempo de resposta**

### 3. Alertas Sugeridos

- Redis não responde
- Uso de memória > 80%
- Queries lentas > 500ms
- Falhas de conexão

## Troubleshooting

### 1. Redis não conecta

```bash
# Verificar se está rodando
docker ps | grep redis

# Verificar logs
docker logs pool-appointment-redis

# Testar conexão manual
redis-cli ping
```

### 2. Erro de conexão

```bash
# Verificar porta
netstat -an | grep 6379

# Reiniciar Redis
docker-compose -f docker-compose.redis.yml restart
```

### 3. Performance ruim

```bash
# Verificar uso de memória
redis-cli info memory

# Verificar comandos lentos
redis-cli slowlog get 10
```

## Configuração de Produção

### 1. Segurança

```bash
# Configurar senha
redis-cli config set requirepass "sua_senha"

# Atualizar REDIS_URL
REDIS_URL="redis://:sua_senha@localhost:6379"
```

### 2. Persistência

```bash
# Habilitar AOF (Append Only File)
redis-cli config set appendonly yes
```

### 3. Cluster (Opcional)

Para alta disponibilidade, considere Redis Cluster:

```yaml
# docker-compose.cluster.yml
version: '3.8'
services:
  redis-master:
    image: redis:7-alpine
    ports:
      - '6379:6379'

  redis-slave:
    image: redis:7-alpine
    command: redis-server --slaveof redis-master 6379
    depends_on:
      - redis-master
```

## Benefícios

✅ **Performance**: Cache rápido para dados frequentemente acessados
✅ **Redução de carga**: Menos queries no banco de dados
✅ **Escalabilidade**: Suporte a múltiplas instâncias
✅ **Observabilidade**: Logs detalhados de performance
✅ **Resiliência**: Reconexão automática e fallbacks
✅ **Flexibilidade**: Configuração por ambiente
