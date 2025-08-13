# Architecture Overview

## Overview

This boilerplate implements a modern architecture based on **Domain-Driven Design (DDD)** with complete **internationalization (i18n)** support using Next.js 15 and next-intl.

## 🏗️ Architectural Structure

### 1. **App Router (Next.js 15)**

```
src/app/[lang]/
├── layout.tsx          # Main layout with NextIntlClientProvider
├── page.tsx            # Home page
├── loading.tsx         # Loading component
└── [...not_found]/     # Dynamic 404 page
```

### 2. **Domain Architecture**

```
src/domains/
├── (public)/           # Public pages
│   └── home/
│       ├── container/  # Business logic
│       └── view/       # Presentation
├── (protected)/        # Protected pages
└── (overview)/         # Shared pages
    ├── loading/
    └── [...not_found]/
```

### 3. **Core Modules**

```
src/core/
├── config/             # Centralized configurations
├── modules/            # Reusable modules
│   ├── components/     # UI components
│   ├── constants/      # Application constants
│   ├── hooks/          # Custom hooks
│   ├── layouts/        # Specific layouts
│   ├── providers/      # React providers
│   └── utils/          # Utilities
└── @types/             # TypeScript types
```

## 🔄 Data Flow

### 1. **Request Flow**

```
Request → Middleware → Layout → Container → View → Response
```

### 2. **Internationalization Flow**

```
URL (/pt) → Middleware → getMessages() → NextIntlClientProvider → useTranslations → View
```

### 3. **Component Architecture**

```
Page → Container (Client) → View (Server/Client)
```

## 🎯 Architectural Principles

### 1. **Separation of Concerns**

- **Containers**: Business logic, state, hooks
- **Views**: Presentation, rendering, props
- **Config**: Centralized configurations
- **Utils**: Reusable utilities

### 2. **Domain-Driven Design**

- Organization by business domains
- Responsibility isolation
- Facilitates maintenance and scalability

### 3. **Type Safety**

- TypeScript throughout the project
- Well-defined types for props
- Interfaces for configurations

### 4. **Internationalization First**

- Native support for multiple languages
- Centralized configuration
- Automatic fallback to default locale

## 🔧 Technical Configurations

### **Next.js 15.4.5**

- App Router
- Server Components by default
- Client Components when necessary
- Middleware for routing

### **TypeScript 5**

- Strict mode enabled
- Path mapping configured
- Custom types for props

### **Tailwind CSS 4**

- Modern configuration
- Dark mode support
- Custom CSS variables

### **ESLint**

- Next.js configuration
- TypeScript support
- Core Web Vitals

## 📊 Quality Metrics

### **Performance**

- Server-side rendering
- Static generation when possible
- Image optimization
- Font optimization

### **SEO**

- Metadata configured
- Open Graph support
- Twitter Cards
- Structured data ready

### **Accessibility**

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

## 🚀 Architecture Benefits

1. **Scalability**: Easy addition of new domains
2. **Maintainability**: Well-organized and typed code
3. **Performance**: SSR and native optimizations
4. **SEO**: Complete configuration for search engines
5. **i18n**: Native support for multiple languages
6. **Developer Experience**: TypeScript, ESLint, hot reload
