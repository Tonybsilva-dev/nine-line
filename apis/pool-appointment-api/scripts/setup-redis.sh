#!/bin/bash

# Script para setup do Redis
echo "🚀 Configurando Redis para pool-appointment-api..."

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verificar se docker-compose está disponível
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose não está disponível. Por favor, instale o docker-compose primeiro."
    exit 1
fi

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cat > .env << EOF
# Environment
NODE_ENV=development
APP_PORT=3000

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/pool_appointment_db"

# Redis
REDIS_URL="redis://localhost:6379"

# Logging
LOG_LEVEL=info

# Docker
DOCKER=false
EOF
    echo "✅ Arquivo .env criado!"
else
    echo "✅ Arquivo .env já existe"
fi

# Iniciar Redis com Docker
echo "🐳 Iniciando Redis com Docker..."
docker-compose -f docker-compose.redis.yml up -d

# Aguardar Redis estar pronto
echo "⏳ Aguardando Redis estar pronto..."
sleep 5

# Verificar se Redis está rodando
if docker ps | grep -q "pool-appointment-redis"; then
    echo "✅ Redis está rodando!"
    
    # Testar conexão
    if docker exec pool-appointment-redis redis-cli ping | grep -q "PONG"; then
        echo "✅ Redis está respondendo corretamente!"
    else
        echo "❌ Redis não está respondendo. Verifique os logs:"
        docker logs pool-appointment-redis
        exit 1
    fi
else
    echo "❌ Falha ao iniciar Redis. Verifique os logs:"
    docker logs pool-appointment-redis
    exit 1
fi

echo ""
echo "🎉 Redis configurado com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure sua DATABASE_URL no arquivo .env"
echo "2. Execute: npm install"
echo "3. Execute: npm run dev"
echo ""
echo "🔗 URLs úteis:"
echo "- Redis CLI: docker exec -it pool-appointment-redis redis-cli"
echo "- Redis Logs: docker logs pool-appointment-redis"
echo "- Health Check: http://localhost:3000/api/health"
echo "" 