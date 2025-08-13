# Shadcn/UI no Web Boilerplate

## Visão Geral

Este projeto está configurado para usar o [shadcn/ui](https://ui.shadcn.com/) através do pacote `@nine-line/ui`. Todos os componentes shadcn/ui estão instalados e configurados no pacote UI centralizado.

## Como Funciona

### 1. **Pacote UI Centralizado**

- Todos os componentes shadcn/ui estão no pacote `@nine-line/ui`
- O web-boilerplate importa os componentes deste pacote
- Configuração consistente em todo o monorepo

### 2. **Importação dos Componentes**

```tsx
// ✅ Correto - Importar do pacote UI
import { Button, Card, Input, Label } from "@nine-line/ui";

// ❌ Incorreto - Não importar diretamente
// import { Button } from "@/core/modules/components/ui/button";
```

## Componentes Disponíveis

### Componentes Básicos

- `Button` - Botões com variantes
- `Card` - Cards e containers
- `Input` - Campos de entrada
- `Label` - Rótulos para formulários
- `Textarea` - Campos de texto multilinha
- `Select` - Menus dropdown

### Componentes de Interface

- `Badge` - Etiquetas e indicadores
- `Avatar` - Avatares de usuário
- `Skeleton` - Placeholders de carregamento

### Componentes Interativos

- `DropdownMenu` - Menus dropdown avançados
- `Dialog` - Modais e diálogos
- `Tooltip` - Dicas de contexto

## Como Adicionar Novos Componentes

### 1. **No Pacote UI** (Diretório `packages/ui`)

```bash
cd packages/ui
npx shadcn@latest add [component-name]
```

### 2. **Atualizar o Índice**

Adicione as exportações em `packages/ui/src/index.ts`

### 3. **Fazer o Build**

```bash
cd packages/ui
npm run build
```

### 4. **Usar no Web Boilerplate**

```tsx
import { NewComponent } from "@nine-line/ui";
```

## Estrutura dos Componentes

Os componentes estão localizados em:

```
packages/ui/src/components/
├── button.tsx
├── card.tsx
├── input.tsx
├── label.tsx
├── textarea.tsx
├── select.tsx
├── badge.tsx
├── avatar.tsx
├── dropdown-menu.tsx
├── dialog.tsx
├── tooltip.tsx
└── skeleton.tsx
```

## Configuração

O arquivo `components.json` no pacote UI está configurado para:

- Usar o estilo "new-york"
- Suportar React Server Components
- Usar TypeScript (.tsx)
- Integrar com Tailwind CSS
- Usar variáveis CSS para temas
- Usar Lucide React para ícones

## Vantagens desta Abordagem

1. **Centralização**: Todos os componentes em um local
2. **Consistência**: Mesmo design system em todo o monorepo
3. **Manutenibilidade**: Atualizações em um só lugar
4. **Reutilização**: Componentes compartilhados entre projetos
5. **Performance**: Sem duplicação de código

## Exemplos de Uso

Veja a página `/examples` para exemplos práticos de todos os componentes.

## Solução de Problemas

### Componente não encontrado

- Verifique se está exportado em `packages/ui/src/index.ts`
- Execute `npm run build` no pacote UI
- Verifique se o pacote está instalado: `npm list @nine-line/ui`

### Estilos não aplicados

- Verifique se o Tailwind CSS está configurado
- Verifique se o arquivo `globals.css` importa `@nine-line/ui/styles`
- Verifique se o `tailwind.config.ts` está configurado corretamente

## Mais Informações

- [Documentação do Pacote UI](../packages/ui/README.md)
- [Como Usar o Pacote UI](README_PACOTE_UI.md)
- [Documentação do Shadcn/UI](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Nota**: Esta configuração oferece o melhor dos dois mundos: a flexibilidade do shadcn/ui e a centralização no pacote UI para consistência em todo o monorepo.
