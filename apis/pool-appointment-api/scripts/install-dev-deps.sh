#!/bin/bash

# Script para instalar dependências de desenvolvimento opcionais
echo "🔧 Instalando dependências de desenvolvimento..."

# Verificar se pino-pretty está instalado
if ! npm list pino-pretty &> /dev/null; then
    echo "📦 Instalando pino-pretty para logs coloridos..."
    npm install --save-dev pino-pretty
    echo "✅ pino-pretty instalado!"
else
    echo "✅ pino-pretty já está instalado"
fi

# Verificar se outras dependências de desenvolvimento estão instaladas
echo "🔍 Verificando outras dependências..."

# Lista de dependências de desenvolvimento opcionais
dev_deps=(
    "nodemon"
    "tsx"
    "vitest"
    "@vitest/ui"
)

for dep in "${dev_deps[@]}"; do
    if ! npm list "$dep" &> /dev/null; then
        echo "⚠️  $dep não está instalado (opcional)"
    else
        echo "✅ $dep está instalado"
    fi
done

echo ""
echo "🎉 Setup de dependências concluído!"
echo ""
echo "💡 Dicas:"
echo "- Para logs coloridos: npm install --save-dev pino-pretty"
echo "- Para desenvolvimento: npm install --save-dev nodemon tsx"
echo "- Para testes: npm install --save-dev vitest @vitest/ui"
echo "" 