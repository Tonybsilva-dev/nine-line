# Configuration Details

## Overview

This document details all technical configurations of the boilerplate, including TypeScript, ESLint, Tailwind CSS, fonts, utilities, providers, and hooks.

## 🔧 Main Configurations

### **1. TypeScript (tsconfig.json)**

Located in the root directory with:

- **strict**: Enables all strict checks
- **paths**: Import mapping with `@/*`
- **jsx**: Preserves JSX for Next.js
- **moduleResolution**: Bundler configuration

### **2. ESLint (eslint.config.mjs)**

Located in the root directory with:

- **Flat Config**: New ESLint configuration
- **next/core-web-vitals**: Performance rules
- **next/typescript**: TypeScript support

### **3. Next.js (next.config.ts)**

Located in the root directory with:

- **next-intl plugin**: Official integration
- **Native Next.js integration**
- **Centralized configuration**

## 🎨 Style Configurations

### **1. Tailwind CSS 4**

Located in `src/app/globals.css`:

- **CSS Variables**: For dynamic themes
- **Dark Mode**: Native support
- **Custom Properties**: Custom CSS variables

### **2. Local Fonts (Barlow)**

Located in `src/core/config/fonts.config.ts`:

- **Thin**: 100 (normal/italic)
- **Light**: 300 (normal/italic)
- **Regular**: 400 (normal/italic)
- **Medium**: 500 (normal/italic)
- **SemiBold**: 600 (normal/italic)
- **Bold**: 700 (normal/italic)
- **ExtraBold**: 800 (normal/italic)
- **Black**: 900 (normal/italic)

## 📊 SEO Configurations

### **1. Metadata Configuration**

Located in `src/core/config/seo-meta.config.ts`:

- **Dynamic Titles**: Template for dynamic titles
- **Open Graph**: Complete support
- **Twitter Cards**: Specific configuration
- **Icons**: Multiple formats and sizes
- **Manifest**: PWA support

## 🔐 Authentication Configurations

### **1. NextAuth Configuration**

Located in `src/core/config/auth.config.ts`:

- **Google OAuth**
- **Credentials (Custom)**
- **GitHub OAuth**
- **Discord OAuth**

### **2. Authentication Provider**

Located in `src/core/modules/providers/auth.provider.tsx`:

- **SessionProvider**: NextAuth session management
- **Client Component**: Uses 'use client' directive
- **Global Context**: Provides authentication state to entire app
- **Session Handling**: Automatic session management

## 📝 Utilities and Constants

### **1. App Constants**

Located in `src/core/modules/constants/app.constants.ts`:

- Application version
- Author information
- Application name
- Logo configuration
- Contact email
- Last update information
- Security settings

### **2. Date Formatting Utility**

Located in `src/core/modules/utils/format-date.utils.ts`:

- Portuguese day and month names
- 12-hour format with am/pm
- Formatted minutes with leading zeros

### **3. Regex Utilities**

Located in `src/core/modules/utils/regex.utils.ts`:

- **CEP**: Brazilian postal code validation
- **Email**: Strict email validation
- **CPF**: Brazilian individual taxpayer registration
- **CNPJ**: Brazilian company registration
- **Phone**: National and international formats
- **UF**: Brazilian state abbreviations

## 🎣 Custom Hooks

### **1. Mobile Detection Hook**

Located in `src/core/modules/hooks/use.mobile.hook.tsx`:

- **Mobile Breakpoint**: 768px threshold
- **Responsive Detection**: Detects mobile devices
- **Event Listeners**: Listens for window resize events
- **State Management**: Manages mobile state with React state
- **SSR Safe**: Handles server-side rendering gracefully

### **2. Media Query Hook**

Located in `src/core/modules/hooks/use-media-query.hook.tsx`:

- **Generic Media Queries**: Accepts any CSS media query
- **Dynamic Matching**: Real-time media query matching
- **Event Handling**: Automatic event listener management
- **Client-Side Only**: Uses 'use client' directive
- **Performance Optimized**: Efficient event listener cleanup

### **3. Breakpoint Hook**

Located in `src/core/modules/hooks/use-breakpoint.hook.tsx`:

- **Predefined Breakpoints**: small-phone, phone, small-tablet, tablet, desktop
- **Breakpoint Values**: 480px, 640px, 768px, 1024px, 1280px
- **Type Safety**: TypeScript types for breakpoint names
- **Responsive Logic**: Matches specific breakpoint thresholds
- **Event Management**: Automatic media query event handling

## 🚀 Scripts and Dependencies

### **1. Package.json Scripts**

Located in the root directory:

- `dev`: Development server
- `build`: Production build
- `start`: Production server
- `lint`: ESLint check

### **2. Main Dependencies**

Located in `package.json`:

- **@vercel/analytics**: Analytics integration
- **next**: 15.4.5 - React framework
- **next-intl**: 4.3.4 - Internationalization
- **react**: 19.1.0 - UI library
- **react-dom**: 19.1.0 - React DOM
- **next-auth**: Authentication framework

## 🔧 Environment Configurations

### **1. Environment Variables**

Located in `.env.local`:

- **NEXTAUTH_SECRET**: Authentication secret
- **NEXTAUTH_URL**: Authentication URL
- **GOOGLE_CLIENT_ID**: Google OAuth client ID
- **GOOGLE_CLIENT_SECRET**: Google OAuth client secret
- **NEXT_PUBLIC_AWS_URL**: AWS S3 bucket URL
- **HASH_ROUNDS**: Password encryption rounds

### **2. TypeScript Environment**

Located in `next-env.d.ts`:

- Next.js type references
- Image type references
- Auto-generated file

## 📊 Performance and Optimizations

### **1. Next.js Optimizations**

- **Image Optimization**: Automatic
- **Font Optimization**: Local fonts
- **Bundle Splitting**: By locale
- **Static Generation**: When possible

### **2. Tailwind CSS Optimizations**

- **Purge CSS**: Automatic
- **JIT Mode**: Just-in-time compilation
- **Custom Properties**: CSS variables

### **3. TypeScript Optimizations**

- **Strict Mode**: All checks enabled
- **Path Mapping**: Clean imports
- **Incremental Compilation**: Faster builds

### **4. Hook Optimizations**

- **Event Listener Management**: Automatic cleanup
- **State Optimization**: Efficient state updates
- **SSR Compatibility**: Server-side rendering safe
- **Performance Monitoring**: Minimal re-renders
