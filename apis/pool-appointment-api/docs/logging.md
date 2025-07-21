# Sistema de Logs e Monitoramento

## Visão Geral

O sistema de logs implementado oferece logging estruturado e monitoramento avançado para a API pool-appointment-api.

## Configuração

### Variáveis de Ambiente

```env
LOG_LEVEL=fatal|error|warn|info|debug|trace  # Padrão: info
NODE_ENV=development|production|test
```

### Dependências Opcionais

Para logs coloridos em desenvolvimento, instale o `pino-pretty`:

```bash
npm install --save-dev pino-pretty
```

Ou use o script de setup:

```bash
./scripts/install-dev-deps.sh
```

### Loggers Disponíveis

- **logger**: Logger principal
- **requestLogger**: Logger específico para requests HTTP
- **errorLogger**: Logger específico para erros
- **performanceLogger**: Logger específico para métricas de performance

## Funcionalidades Implementadas

### 1. Request Logging

**Middleware**: `requestLoggerMiddleware`

**Logs gerados**:

- **request_start**: Início de cada request
- **request_end**: Fim de cada request com duração
- **request_error**: Requests com status >= 400
- **slow_request**: Requests com duração > 1000ms

**Informações logadas**:

- Método HTTP
- URL
- Status code
- Duração
- Request ID único
- User ID (se autenticado)
- IP do cliente
- User Agent
- Tamanho da resposta

### 2. Error Logging

**Middleware**: `errorHandler` melhorado

**Logs gerados**:

- **application_error**: Erros de aplicação
- **validation_error**: Erros de validação Zod
- **database_error**: Erros de banco de dados

**Informações logadas**:

- Mensagem de erro
- Stack trace
- Request ID
- User ID
- Body da requisição
- Query parameters
- Headers relevantes

### 3. Performance Monitoring

**Logs gerados**:

- **slow_request**: Requests lentos (>1000ms)
- **slow_query**: Queries lentas (>100ms)
- **slow_health_check**: Health checks lentos (>500ms)

### 4. Health Check

**Endpoint**: `GET /api/health`

**Verificações**:

- Conexão com banco de dados
- Conexão com Redis
- Uptime da aplicação
- Uso de memória

**Resposta de sucesso**:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "memory": {
    "rss": 123456,
    "heapTotal": 98765,
    "heapUsed": 54321
  },
  "duration": 45,
  "services": {
    "database": "connected",
    "redis": "connected"
  }
}
```

### 5. Graceful Shutdown

**Funcionalidades**:

- Fecha conexões HTTP
- Desconecta do banco de dados
- Desconecta do Redis
- Logs de shutdown
- Tratamento de exceções não capturadas

## Exemplos de Uso

### Logging Manual

```typescript
import {
  logger,
  requestLogger,
  errorLogger,
  performanceLogger,
} from '../config/logger';

// Log básico
logger.info('User created successfully', { userId: '123' });

// Log de request
requestLogger.info({
  type: 'custom_request_log',
  message: 'Custom request information',
  userId: '123',
});

// Log de erro
errorLogger.error({
  type: 'business_error',
  error: 'User not found',
  userId: '123',
});

// Log de performance
performanceLogger.warn({
  type: 'slow_operation',
  operation: 'user_creation',
  duration: 1500,
});
```

### Estrutura dos Logs

Todos os logs seguem uma estrutura consistente:

```json
{
  "level": "info",
  "time": "2024-01-01T00:00:00.000Z",
  "pid": 12345,
  "hostname": "server-1",
  "environment": "production",
  "version": "1.0.0",
  "module": "request",
  "type": "request_start",
  "method": "POST",
  "url": "/api/users",
  "requestId": "abc123def456",
  "userId": "user-123",
  "duration": 150
}
```

## Monitoramento

### Métricas Disponíveis

1. **Requests por minuto**
2. **Tempo médio de resposta**
3. **Taxa de erro**
4. **Requests lentos**
5. **Queries lentas**
6. **Uso de memória**
7. **Uptime**

### Alertas Sugeridos

- Requests com duração > 2000ms
- Taxa de erro > 5%
- Health check falhando
- Uso de memória > 80%
- Queries com duração > 500ms

## Integração com Ferramentas Externas

### Log Aggregation

Para produção, considere integrar com:

- **ELK Stack** (Elasticsearch, Logstash, Kibana)
- **Datadog**
- **New Relic**
- **Sentry** (para erros)

### Exemplo de Configuração para ELK

```typescript
// Adicionar transport para Elasticsearch
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-elasticsearch',
    options: {
      node: 'http://localhost:9200',
      index: 'pool-appointment-api-logs',
    },
  },
});
```

## Benefícios

✅ **Observabilidade completa**: Todos os requests e erros são logados
✅ **Performance monitoring**: Identificação automática de gargalos
✅ **Debugging facilitado**: Request ID único para rastreamento
✅ **Health monitoring**: Endpoint de saúde da aplicação
✅ **Graceful shutdown**: Fechamento limpo da aplicação
✅ **Logs estruturados**: Fácil parsing e análise
✅ **Configuração flexível**: Diferentes níveis por ambiente
