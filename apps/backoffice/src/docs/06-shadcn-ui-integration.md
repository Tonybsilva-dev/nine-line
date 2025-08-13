# Shadcn UI Integration

## Overview

This document explains how shadcn/ui is integrated into the project and how to use its components.

## 🎯 Configuration

### **1. Project Structure**

```
src/core/modules/components/ui/
├── button.tsx
├── card.tsx
├── input.tsx
├── skeleton.tsx
├── typography.tsx
└── ... (other components)

src/core/modules/components/custom/
├── back-button.component.tsx
├── loading-spinner.component.tsx
└── ... (other custom components)
```

### **2. Configuration Files**

**components.json** - Located in project root:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "gray",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/core/modules/components",
    "utils": "@/core/modules/utils/cn.utils",
    "ui": "@/core/modules/components/ui",
    "lib": "@/lib",
    "hooks": "@/core/modules/hooks"
  },
  "iconLibrary": "lucide"
}
```

### **3. Utility Function**

Located in `src/core/modules/utils/cn.utils.ts`:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## 🚀 Adding Components

### **1. Install New Components**

```bash
# Add a single component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add card input dialog

# Add with specific style
npx shadcn@latest add button --style=default
```

### **2. Available Components**

Common components you can add:

- `button` - Interactive buttons with variants
- `card` - Content containers
- `input` - Form inputs
- `dialog` - Modal dialogs
- `dropdown-menu` - Dropdown menus
- `form` - Form components
- `select` - Select dropdowns
- `textarea` - Multi-line text inputs
- `toast` - Notification toasts
- `tooltip` - Hover tooltips
- `skeleton` - Loading placeholders

**Custom Components:**

- `typography` - Complete typography system (custom implementation)
- `loading-spinner` - Reusable loading component
- `back-button` - Navigation button component

## 🎨 Using Components

### **1. Basic Usage**

```typescript
import { Button } from "@/core/modules/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/modules/components/ui/card";

export const MyComponent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
};
```

### **2. Button Variants**

```typescript
// Different variants
<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

### **3. Card Components**

```typescript
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### **4. Typography Components**

```typescript
import { H1, H2, H3, P, Lead, Large, Small, Muted, Blockquote, Code } from "@/core/modules/components/ui/typography";

// Headings
<H1>Main Title</H1>
<H2>Section Title</H2>
<H3>Subsection Title</H3>

// Text elements
<P>Regular paragraph text</P>
<Lead>Lead paragraph for introductions</Lead>
<Large>Large text for emphasis</Large>
<Small>Small text for captions</Small>
<Muted>Muted text for secondary info</Muted>

// Special elements
<Blockquote>Quote or testimonial text</Blockquote>
<Code>Inline code snippet</Code>
```

### **5. Loading Components**

```typescript
import { Skeleton } from "@/core/modules/components/ui/skeleton";
import { LoadingSpinner } from "@/core/modules/components/custom/loading-spinner.component";

// Skeleton loading
<Skeleton className="h-4 w-full" />
<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-4 w-1/2" />

// Loading spinner component
<LoadingSpinner
  title="Carregando..."
  subtitle="Aguarde um momento"
  showSkeleton={true}
/>
```

### **6. Navigation Components**

```typescript
import { BackButton } from "@/core/modules/components/custom/back-button.component";

// Basic back button
<BackButton />

// With custom text
<BackButton text="Voltar" />

// With custom styling
<BackButton className="w-full sm:w-auto" />
```

## 🔧 Customization

### **1. Styling Components**

```typescript
// Using className prop
<Button className="bg-blue-500 hover:bg-blue-600">
  Custom Button
</Button>

// Using cn utility
import { cn } from "@/core/modules/utils/cn.utils";

<Button className={cn(
  "bg-blue-500",
  isActive && "bg-blue-600"
)}>
  Conditional Styling
</Button>
```

### **2. Component Variants**

```typescript
// Using class-variance-authority
const buttonVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "default-classes",
      outline: "outline-classes",
    },
    size: {
      sm: "small-classes",
      lg: "large-classes",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
```

### **3. Theme Customization**

Located in `src/app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}
```

## 📋 Best Practices

### **1. Component Organization**

- Keep all shadcn/ui components in `src/core/modules/components/ui/`
- Use consistent naming conventions
- Group related components together

### **2. Import Patterns**

```typescript
// ✅ Good - Direct imports
import { Button } from "@/core/modules/components/ui/button";

// ✅ Good - Multiple components
import { Card, CardContent, CardHeader, CardTitle } from "@/core/modules/components/ui/card";

// ❌ Bad - Wildcard imports
import * from "@/core/modules/components/ui/button";
```

### **3. TypeScript Integration**

```typescript
// Using component props
import { Button } from "@/core/modules/components/ui/button";
import type { ButtonProps } from "@/core/modules/components/ui/button";

interface MyButtonProps extends ButtonProps {
  customProp?: string;
}

export const MyButton: React.FC<MyButtonProps> = ({ customProp, ...props }) => {
  return <Button {...props} />;
};
```

### **4. Accessibility**

```typescript
// Always include proper ARIA attributes
<Button aria-label="Close dialog" aria-describedby="dialog-description">
  Close
</Button>

// Use semantic HTML
<Button asChild>
  <a href="/link">Link Button</a>
</Button>
```

## 🎯 Integration with Project Architecture

### **1. Container/View Pattern**

```typescript
// Container - Business logic
export const MyContainer = () => {
  const handleClick = () => {
    // Business logic
  };

  return (
    <MyView
      params={{
        onButtonClick: handleClick
      }}
    />
  );
};

// View - Presentation with shadcn/ui
export const MyView: React.FC<PageProps> = ({ params }) => {
  const { onButtonClick } = params;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={onButtonClick}>
          Action
        </Button>
      </CardContent>
    </Card>
  );
};
```

### **2. Internationalization**

```typescript
export const MyView: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('card.title')}</CardTitle>
        <CardDescription>{t('card.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>{t('button.text')}</Button>
      </CardContent>
    </Card>
  );
};
```

### **3. Typography with i18n**

```typescript
export const MyView: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;

  return (
    <div>
      <H1>{t('page.title')}</H1>
      <Lead>{t('page.description')}</Lead>
      <P>{t('page.content')}</P>
    </div>
  );
};
```

### **4. Loading States**

```typescript
export const MyView: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <LoadingSpinner
        title={t('loading.title')}
        subtitle={t('loading.subtitle')}
      />
    );
  }

  return (
    <Card>
      <CardContent>
        <H1>{t('page.title')}</H1>
        <P>{t('page.content')}</P>
      </CardContent>
    </Card>
  );
};
```

## 🔄 Adding New Components

### **1. Step-by-Step Process**

1. **Install Component**:

   ```bash
   npx shadcn@latest add component-name
   ```

2. **Verify Installation**:
   - Check if component was created in `src/core/modules/components/ui/`
   - Verify imports work correctly

3. **Test Component**:
   - Create a simple test in your view
   - Verify styling and functionality

4. **Document Usage**:
   - Add examples to this documentation
   - Update component-specific docs if needed

### **2. Custom Component Creation**

```typescript
// src/core/modules/components/ui/custom-component.tsx
import * as React from "react"
import { cn } from "@/core/modules/utils/cn.utils"

interface CustomComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline'
}

export const CustomComponent = React.forwardRef<
  HTMLDivElement,
  CustomComponentProps
>(({ className, variant = 'default', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "base-classes",
        variant === 'outline' && "outline-classes",
        className
      )}
      {...props}
    />
  )
})

CustomComponent.displayName = "CustomComponent"
```

## 📊 Performance Considerations

### **1. Bundle Size**

- Components are tree-shakeable
- Only import what you need
- Use dynamic imports for large components

### **2. CSS Optimization**

- Tailwind CSS purges unused styles
- Components use CSS variables for theming
- Minimal CSS overhead

### **3. Runtime Performance**

- Components are lightweight
- No heavy JavaScript dependencies
- Optimized for React 19

## 🆘 Troubleshooting

### **1. Common Issues**

**Import Errors**:

```bash
# Check if component exists
ls src/core/modules/components/ui/

# Verify import path
import { Button } from "@/core/modules/components/ui/button";
```

**Styling Issues**:

```bash
# Rebuild CSS
npm run build

# Clear cache
rm -rf .next
```

**TypeScript Errors**:

```bash
# Check types
npx tsc --noEmit

# Install missing types
npm install @types/component-name
```

### **2. Debugging**

```typescript
// Check component props
console.log("Button props:", props);

// Verify className merging
console.log(
  "Final className:",
  cn(buttonVariants({ variant, size, className })),
);
```

## 🔗 Resources

### **Official Documentation**

- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [Component Registry](https://ui.shadcn.com/docs/components)
- [Installation Guide](https://ui.shadcn.com/docs/installation)

### **Related Tools**

- [Radix UI](https://www.radix-ui.com/) - Headless components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Class Variance Authority](https://cva.style/docs) - Component variants
- [Lucide Icons](https://lucide.dev/) - Icon library

---

**Last updated**: August 2025  
**Shadcn UI version**: Latest  
**Project integration**: Complete
