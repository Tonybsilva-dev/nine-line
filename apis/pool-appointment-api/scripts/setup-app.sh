#!/bin/bash
set -e

echo "🚀 Inicializando a aplicação..."

# 1. Rodar migrations
echo "🗄️ Aplicando migrations do banco de dados..."
npx prisma migrate deploy

# 2. Gerar Prisma Client
echo "📦 Gerando Prisma Client..."
npx prisma generate

# 3. Executar o seeder de RBAC
echo "🌱 Populando RBAC padrão..."
npx tsx src/modules/rbac/infra/seeders/rbac-seeder.ts

# 4. Criar usuários default
echo "👤 Criando usuários default..."
npx tsx src/modules/users/infra/seeders/create-default-users.ts

# 5. Iniciar a aplicação
npm run start 