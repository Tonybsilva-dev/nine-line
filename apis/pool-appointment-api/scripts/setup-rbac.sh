#!/bin/bash

echo "🚀 Setting up RBAC system..."

# 1. Regenerar Prisma com o novo schema
echo "📦 Regenerating Prisma client..."
npx prisma generate

# 2. Criar migration para as novas tabelas
echo "🗄️ Creating database migration..."
npx prisma migrate dev --name add_rbac_tables

# 3. Executar o seeder
echo "🌱 Running RBAC seeder..."
npx tsx src/modules/rbac/infra/seeders/rbac-seeder.ts

echo "✅ RBAC setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Run the application: npm run dev"
echo "2. Test role assignment via API"
echo "3. Check permissions in the database" 