# Web Boilerplate

Um boilerplate moderno para aplicações Next.js com suporte completo a internacionalização (i18n) usando next-intl.

## 🏗️ Estrutura do Projeto

```
web-boilerplate/
├── src/
│   ├── app/
│   │   └── [lang]/                    # Roteamento dinâmico por idioma
│   │       ├── layout.tsx             # Layout principal com NextIntlClientProvider
│   │       ├── page.tsx               # Página inicial
│   │       ├── loading.tsx            # Componente de carregamento
│   │       └── [...not_found]/
│   │           └── page.tsx           # Página 404
│   ├── core/
│   │   ├── config/
│   │   │   ├── auth.config.ts         # Configurações de autenticação
│   │   │   ├── fonts.config.ts        # Configuração de fontes locais
│   │   │   └── seo-meta.config.ts     # Configurações de SEO
│   │   ├── modules/
│   │   │   ├── components/            # Componentes reutilizáveis
│   │   │   ├── constants/             # Constantes da aplicação
│   │   │   ├── hooks/                 # Custom hooks
│   │   │   ├── layouts/               # Layouts específicos
│   │   │   ├── providers/             # Providers do React
│   │   │   └── utils/                 # Utilitários
│   │   └── @types/
│   │       └── page-params.types.ts   # Tipos para props de páginas
│   ├── domains/                       # Arquitetura por domínios
│   │   ├── (overview)/                # Páginas de visão geral
│   │   │   ├── loading/
│   │   │   └── [...not_found]/
│   │   ├── (protected)/               # Páginas protegidas
│   │   └── (public)/                  # Páginas públicas
│   │       └── home/
│   │           ├── container/          # Containers (lógica de negócio)
│   │           └── view/              # Views (apresentação)
│   ├── locales/                       # Configuração de internacionalização
│   │   ├── messages/                  # Arquivos de tradução
│   │   │   ├── pt.json               # Português
│   │   │   ├── en.json               # Inglês
│   │   │   └── es.json               # Espanhol
│   │   ├── request.locale.ts         # Configuração de requisições
│   │   └── routing.locale.ts         # Configuração de roteamento
│   └── assets/
│       ├── fonts/                     # Fontes locais (Barlow)
│       ├── files/                     # Arquivos estáticos
│       └── images/                    # Imagens
├── public/                            # Arquivos públicos
├── middleware.ts                      # Middleware para redirecionamento
├── next.config.ts                     # Configuração do Next.js
└── package.json
```

## 🌐 Sistema de Internacionalização (i18n)

### Configuração

O projeto usa **next-intl** para gerenciar internacionalização com suporte a:

- **Português (pt)** - Idioma padrão
- **Inglês (en)**
- **Espanhol (es)**

### Arquivos de Configuração

#### 1. `next.config.ts`

```typescript
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/locales/request.locale.ts");

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
```

#### 2. `src/locales/routing.locale.ts`

```typescript
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en", "es"],
  defaultLocale: "pt",
  localeCookie: true,
  localeDetection: true,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

#### 3. `src/locales/request.locale.ts`

```typescript
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing.locale";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "pt" | "en" | "es")) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
```

### Fluxo de Mensagens de Tradução

```mermaid
graph TD
    A[Request] --> B[middleware.ts]
    B --> C[Redireciona para /pt se necessário]
    C --> D[layout.tsx]
    D --> E[getMessages() - Carrega traduções]
    E --> F[NextIntlClientProvider]
    F --> G[Container Component]
    G --> H[useTranslations hook]
    H --> I[View Component]
    I --> J[Renderiza com traduções]
```

#### 1. **Middleware** (`middleware.ts`)

- Intercepta requisições
- Redireciona `/` para `/pt`
- Configura locale baseado na URL

#### 2. **Layout Principal** (`src/app/[lang]/layout.tsx`)

```typescript
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const messages = await getMessages();

  return (
    <html lang={lang}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

#### 3. **Container** (`src/domains/(public)/home/container/home.container.tsx`)

```typescript
'use client'

import { HomeView } from "../view/home.view";
import { useTranslations } from 'next-intl';

export const HomeContainer = () => {
  const t = useTranslations('home');

  return <HomeView params={{ translations: t }} />;
};
```

#### 4. **View** (`src/domains/(public)/home/view/home.view.tsx`)

```typescript
import { PageProps } from "@/core/@types/page-params.types";

export const HomeView: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
};
```

### Arquivos de Tradução

#### `src/locales/messages/pt.json`

```json
{
  "loading": {
    "title": "Carregando...",
    "subtitle": "Aguarde um momento"
  },
  "home": {
    "title": "Bem-vindo ao Next.js",
    "description": "Comece a construir sua aplicação web moderna com Next.js",
    "step1": {
      "start": "Comece editando",
      "file": "src/app/page.tsx"
    },
    "step2": "Salve e veja suas mudanças instantaneamente",
    "deploy": "Fazer deploy",
    "docs": "Ler documentação",
    "learn": "Aprender",
    "examples": "Exemplos",
    "nextjs": "Ir para nextjs.org"
  }
}
```

## 🎨 Arquitetura de Componentes

### Padrão Container/View

O projeto segue o padrão **Container/View** para separar responsabilidades:

- **Container**: Lógica de negócio, hooks, estado
- **View**: Apresentação, renderização, props

### Tipagem

#### `src/core/@types/page-params.types.ts`

```typescript
export type PageProps<TParams = Record<string, unknown>> = {
  params: TParams & {
    locale?: string;
    translations: (
      key: string,
      params?: Record<string, string | number>,
    ) => string;
  };
  searchParams?: {
    page?: string;
    limit?: string;
    sort?: string;
    order?: "asc" | "desc";
    query?: string;
    filter?: string;
    [key: `filter_${string}`]: string | undefined;
    [key: string]: string | string[] | undefined;
  };
  router?: ReturnType<typeof useRouter>;
};
```

## 🚀 Como Executar

1. **Instalar dependências**

   ```bash
   npm install
   ```

2. **Executar em desenvolvimento**

   ```bash
   npm run dev
   ```

3. **Acessar a aplicação**
   - Português: <http://localhost:3000/pt>
   - Inglês: <http://localhost:3000/en>
   - Espanhol: <http://localhost:3000/es>

## 📁 Estrutura de Domínios

### `(public)` - Páginas Públicas

- Acessíveis sem autenticação
- Ex: Home, About, Contact

### `(protected)` - Páginas Protegidas

- Requerem autenticação
- Ex: Dashboard, Profile, Settings

### `(overview)` - Páginas de Visão Geral

- Páginas especiais como loading, not-found
- Compartilhadas entre domínios

## 🔧 Configurações

### Fontes

- **Barlow**: Fonte local configurada em `src/core/config/fonts.config.ts`
- Suporte completo a pesos e estilos

### SEO

- Configurações de metadados em `src/core/config/seo-meta.config.ts`
- Suporte a Open Graph e Twitter Cards

### Autenticação

- Configurações em `src/core/config/auth.config.ts`
- Integração com NextAuth.js

## 🐛 Solução de Problemas

### Erro de Hidratação

Se você encontrar erros de hidratação, verifique:

1. Não use `console.log` em componentes que fazem SSR
2. Evite diferenças entre servidor e cliente
3. Use `useEffect` para código que deve rodar apenas no cliente

### Traduções não carregam

1. Verifique se o locale está correto na URL
2. Confirme se o arquivo de tradução existe
3. Verifique a estrutura das chaves de tradução

## 📚 Tecnologias Utilizadas

- **Next.js 15.4.5** - Framework React
- **next-intl 4.3.4** - Internacionalização
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **React 18** - Biblioteca de UI

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
