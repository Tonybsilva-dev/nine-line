# Troubleshooting Guide

## Overview

This document addresses the most common problems encountered during development and their solutions.

## 🐛 Common Problems

### **1. Hydration Error**

#### **Symptoms:**

```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
```

#### **Common Causes:**

1. **console.log in SSR components**
2. **Differences between server and client**
3. **Browser APIs in Server Components**
4. **Dynamic data without snapshot**

#### **Solutions:**

**Problem 1: console.log in request.locale.ts**

```typescript
// ❌ Bad - Causes hydration error
console.log("Request Config - Initial locale:", locale);

// ✅ Good - Remove console.log
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  // ... rest of code
});
```

**Problem 2: Browser APIs**

```typescript
// ❌ Bad - window in Server Component
const isClient = typeof window !== 'undefined';

// ✅ Good - useEffect for client code
'use client'
import { useEffect, useState } from 'react';

export const ClientComponent = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <div>Client content</div>;
};
```

**Problem 3: Dynamic Data**

```typescript
// ❌ Bad - Date.now() causes differences
const timestamp = Date.now();

// ✅ Good - useEffect for dynamic data
const [timestamp, setTimestamp] = useState(0);

useEffect(() => {
  setTimestamp(Date.now());
}, []);
```

### **2. Translations Not Loading**

#### **Symptoms:**

- Texts appear as keys (`home.title`)
- 500 error when accessing pages
- Locale not detected

#### **Solutions:**

**Check 1: Locale in URL**

```bash
# ✅ Correct URLs
http://localhost:3000/pt
http://localhost:3000/en
http://localhost:3000/es

# ❌ Incorrect URLs
http://localhost:3000/
http://localhost:3000/invalid
```

**Check 2: Translation File**

Located in `src/locales/messages/pt.json`:

- Verify file exists
- Check JSON syntax
- Validate key structure

**Check 3: next-intl Configuration**

Located in `src/locales/request.locale.ts`:

- Validate locale support
- Check fallback configuration
- Verify message loading

### **3. Build Problems**

#### **Symptoms:**

- Error during `npm run build`
- TypeScript errors
- ESLint errors

#### **Solutions:**

**TypeScript Errors:**

```bash
# Check TypeScript errors
npx tsc --noEmit

# Fix imports
import { PageProps } from "@/core/@types/page-params.types";
```

**ESLint Errors:**

```bash
# Check ESLint errors
npm run lint

# Fix automatically
npm run lint -- --fix
```

**Build Errors:**

```bash
# Clear cache
rm -rf .next
npm run build
```

### **4. Performance Problems**

#### **Symptoms:**

- Slow loading
- Large bundle size
- Memory leaks

#### **Solutions:**

**Bundle Size:**

```typescript
// ✅ Good - Dynamic import
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
});

// ❌ Bad - Static import
import HeavyComponent from './HeavyComponent';
```

**Memory Leaks:**

```typescript
// ✅ Good - Cleanup in useEffect
useEffect(() => {
  const interval = setInterval(() => {
    // Logic
  }, 1000);

  return () => clearInterval(interval);
}, []);
```

**Image Optimization:**

```typescript
// ✅ Good - Image optimization
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={300}
  priority={false}
/>
```

### **5. Routing Problems**

#### **Symptoms:**

- Pages not found
- Incorrect redirects
- Locale not applied

#### **Solutions:**

**Middleware Configuration:**

Located in `middleware.ts`:

- Verify redirect logic
- Check matcher configuration
- Validate locale handling

**Dynamic Routes:**

Located in `src/app/[lang]/`:

- Verify folder structure
- Check dynamic segments
- Validate catch-all routes

### **6. Style Problems**

#### **Symptoms:**

- CSS not applied
- Tailwind not working
- Dark mode not working

#### **Solutions:**

**Tailwind CSS:**

Located in `src/app/globals.css`:

- Verify import statement
- Check CSS variables
- Validate theme configuration

**Dark Mode:**

Located in `src/app/globals.css`:

- Check media query
- Verify CSS variables
- Test color scheme

**Local Fonts:**

Located in `src/core/config/fonts.config.ts`:

- Verify font paths
- Check weight configuration
- Validate variable assignment

### **7. Hook Problems**

#### **Symptoms:**

- Hooks not working in SSR
- Memory leaks in hooks
- Incorrect responsive behavior

#### **Solutions:**

**Mobile Detection Hook:**

Located in `src/core/modules/hooks/use.mobile.hook.tsx`:

- Verify client-side usage
- Check breakpoint value (768px)
- Ensure proper event listener cleanup
- Test SSR compatibility

**Media Query Hook:**

Located in `src/core/modules/hooks/use-media-query.hook.tsx`:

- Validate media query syntax
- Check event listener management
- Verify client-side only usage
- Test performance impact

**Breakpoint Hook:**

Located in `src/core/modules/hooks/use-breakpoint.hook.tsx`:

- Verify breakpoint values
- Check TypeScript types
- Test responsive behavior
- Validate event handling

### **8. Provider Problems**

#### **Symptoms:**

- Authentication not working
- Session state undefined
- Provider context errors

#### **Solutions:**

**Authentication Provider:**

Located in `src/core/modules/providers/auth.provider.tsx`:

- Verify NextAuth configuration
- Check SessionProvider wrapping
- Validate client-side usage
- Test session management

## 🔧 Debugging

### **1. Strategic Console Logs**

```typescript
// Debug translations
console.log("Messages loaded:", Object.keys(messages));

// Debug locale
console.log("Current locale:", locale);

// Debug props
console.log("Container props:", params);

// Debug hooks
console.log("Mobile state:", isMobile);
console.log("Breakpoint:", currentBreakpoint);
```

### **2. React DevTools**

```typescript
// Check component state
// Check passed props
// Check re-renders
// Check provider context
```

### **3. Network Tab**

```bash
# Check requests
# Check asset loading
# Check cache
# Check authentication requests
```

## 🚀 Optimizations

### **1. Performance**

```typescript
// ✅ Lazy loading
const LazyComponent = dynamic(() => import("./LazyComponent"));

// ✅ Memoization
const MemoizedComponent = memo(Component);

// ✅ useMemo for expensive computations
const expensiveValue = useMemo(() => {
  return heavyComputation(data);
}, [data]);
```

### **2. SEO**

```typescript
// ✅ Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}) {
  return {
    title: `Page | ${params.lang.toUpperCase()}`,
    description: "Page description",
  };
}
```

### **3. Accessibility**

```typescript
// ✅ ARIA labels
<button aria-label="Close modal">×</button>

// ✅ Semantic HTML
<main>
  <section>
    <h1>Title</h1>
  </section>
</main>
```

### **4. Hook Optimizations**

```typescript
// ✅ Efficient hook usage
const isMobile = useIsMobile();
const isTablet = useBreakpoint("tablet");

// ✅ Memoized hook results
const responsiveState = useMemo(
  () => ({
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
  }),
  [isMobile, isTablet],
);
```

## 📋 Verification Checklist

### **Before Deploy:**

- [ ] `npm run build` without errors
- [ ] `npm run lint` without warnings
- [ ] Tests passing
- [ ] Performance audit
- [ ] Accessibility audit
- [ ] SEO audit
- [ ] Hook functionality tested
- [ ] Provider context verified

### **Production Checks:**

- [ ] Environment variables configured
- [ ] Domain configured
- [ ] SSL certificate
- [ ] Analytics configured
- [ ] Error tracking configured
- [ ] Authentication working
- [ ] Responsive design tested

### **Monitoring:**

- [ ] Performance monitoring
- [ ] Error tracking
- [ ] User analytics
- [ ] SEO monitoring
- [ ] Security scanning
- [ ] Hook performance
- [ ] Provider state

## 🆘 Help Resources

### **Official Documentation:**

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NextAuth Documentation](https://next-auth.js.org/)

### **Community:**

- [Next.js GitHub](https://github.com/vercel/next.js)
- [next-intl GitHub](https://github.com/amannn/next-intl)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

### **Debug Tools:**

- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Next.js Analytics](https://nextjs.org/analytics)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
