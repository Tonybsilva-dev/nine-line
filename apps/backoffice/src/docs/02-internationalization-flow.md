# Internationalization Flow

## Overview

The internationalization system is based on **next-intl** and implements a complete flow from request to final rendering.

## 🔄 Complete Flow

### 1. **Request & Middleware**

The middleware intercepts requests and redirects `/` to `/pt` using the configuration in `middleware.ts`.

**Responsibilities:**

- Intercepts requests
- Redirects URLs without locale to default locale
- Configures locale based on URL

### 2. **Routing Configuration**

Configured in `src/locales/routing.locale.ts` with:

- **locales**: Supported languages (pt, en, es)
- **defaultLocale**: Default language (pt)
- **localeCookie**: Locale persistence
- **localeDetection**: Automatic detection

### 3. **Request Configuration**

Handled in `src/locales/request.locale.ts`:

1. Gets locale from request
2. Validates if locale is supported
3. Loads message file dynamically
4. Returns complete configuration

### 4. **Layout Provider**

Implemented in `src/app/[lang]/layout.tsx`:

- Loads messages via `getMessages()`
- Configures `NextIntlClientProvider`
- Sets `lang` attribute in HTML
- Provides context for child components

### 5. **Container Component**

Example from `src/domains/(public)/home/container/home.container.tsx`:

- Client component (`'use client'`)
- Uses `useTranslations` hook
- Passes translation function to View
- Keeps business logic separate

### 6. **View Component**

Example from `src/domains/(public)/home/view/home.view.tsx`:

- Presentation component
- Receives translations via props
- Can be Server or Client Component
- Focuses only on rendering

## 📁 Message Structure

### **Translation Files**

Located in `src/locales/messages/`:

- `pt.json` - Portuguese
- `en.json` - English
- `es.json` - Spanish

### **Hierarchical Structure**

- **Namespaces**: `loading`, `home`, `not-found`
- **Nested Objects**: `step1.start`, `step1.file`
- **Flat Keys**: `title`, `description`

## 🎯 TypeScript Typing

### **PageProps Interface**

Defined in `src/core/@types/page-params.types.ts` with:

- Generic type support
- Translation function typing
- Search parameters support
- Router integration

### **Usage Example**

```typescript
// Container with specific typing
interface HomeContainerParams {
  translations: (
    key: string,
    params?: Record<string, string | number>,
  ) => string;
  user?: User;
  posts?: Post[];
}

// View with specific typing
export const HomeView: React.FC<PageProps<HomeContainerParams>> = ({
  params,
}) => {
  const { translations: t, user, posts } = params;
  // ...
};
```

## 🔧 Next.js Configuration

### **Plugin Integration**

Configured in `next.config.ts`:

- Official next-intl plugin
- Native Next.js integration
- Centralized configuration

## 🚀 Advanced Features

### 1. **Parameter Interpolation**

```typescript
// Message
"welcome": "Hello, {name}! Welcome to {app}."

// Usage
t('welcome', { name: 'John', app: 'Next.js' })
// Result: "Hello, John! Welcome to Next.js."
```

### 2. **Pluralization**

```typescript
// Message
"items": {
  "one": "{count} item",
  "other": "{count} items"
}

// Usage
t('items', { count: 5 })
// Result: "5 items"
```

### 3. **Date Formatting**

```typescript
// Message
"lastUpdated": "Last updated: {date}"

// Usage
t('lastUpdated', {
  date: new Intl.DateTimeFormat('pt-BR').format(new Date())
})
```

## 🐛 Problem Solving

### **Hydration Error**

**Cause:** Differences between server and client
**Solution:** Avoid `console.log` in SSR components

### **Translations Not Loading**

**Check:**

1. Locale in URL is correct
2. Translation file exists
3. Key structure is correct

### **Locale Fallback**

**Behavior:**

- Invalid URL → redirects to `/pt`
- Unsupported locale → uses `defaultLocale`
- File not found → 500 error

## 📊 Performance

### **Optimizations**

- Dynamic message loading
- Automatic caching
- Bundle splitting by locale
- Server-side rendering

### **Metrics**

- Bundle size per language
- Message loading time
- Cache hit rate
