#!/bin/bash

echo "🔧 Corrigindo descrições YAML nos arquivos .doc.ts..."

# Encontrar todos os arquivos .doc.ts
find apps/api/src -name "*.doc.ts" -type f | while read -r file; do
  echo "Processando: $file"
  
  # Corrigir descrições que não estão entre aspas duplas
  # Padrão: description: texto sem aspas
  sed -i '' 's/description: \([^"]*\)$/description: "\1"/g' "$file"
  
  # Corrigir descrições em propriedades de schema
  # Padrão: description: texto sem aspas (dentro de schema)
  sed -i '' 's/^ \*                 description: \([^"]*\)$/ *                 description: "\1"/g' "$file"
  sed -i '' 's/^ \*         description: \([^"]*\)$/ *         description: "\1"/g' "$file"
  sed -i '' 's/^ \*         description: \([^"]*\)$/ *         description: "\1"/g' "$file"
done

echo "✅ Descrições YAML corrigidas!" 