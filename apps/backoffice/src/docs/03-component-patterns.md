# Component Patterns

## Overview

This document describes the component patterns used in this boilerplate, focusing on the Container/View pattern and other architectural decisions.

## 🏗️ Container/View Pattern

### **1. Pattern Description**

The Container/View pattern separates business logic from presentation:

- **Container**: Handles business logic, state management, data fetching
- **View**: Handles presentation, rendering, UI interactions

### **2. File Structure**

```
src/domains/(public)/home/
├── container/
│   └── home.container.tsx    # Business logic
└── view/
    └── home.view.tsx         # Presentation
```

### **3. Container Implementation**

```tsx
"use client";

import { useTranslations } from "next-intl";
import { HomeView } from "./view/home.view";
import { PageProps } from "@/core/@types/page-params.types";

export const HomeContainer: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;

  return <HomeView params={{ translations: t }} />;
};
```

### **4. View Implementation**

```tsx
import { PageProps } from "@/core/@types/page-params.types";
import { H1, Lead } from "@/core/modules/components/ui/typography";

export const HomeView: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;

  return (
    <div>
      <H1>{t("title")}</H1>
      <Lead>{t("description")}</Lead>
    </div>
  );
};
```

## 🎯 Benefits

### **1. Separation of Concerns**

- **Container**: Data fetching, state management, business logic
- **View**: UI rendering, user interactions, styling

### **2. Testability**

- **Container**: Unit test business logic
- **View**: Unit test UI components

### **3. Reusability**

- **View**: Can be reused with different containers
- **Container**: Can be reused with different views

### **4. Maintainability**

- Clear separation makes code easier to understand
- Changes to logic don't affect UI
- Changes to UI don't affect logic

## 🔧 Implementation Details

### **1. TypeScript Integration**

```tsx
// types/page-params.types.ts
export interface PageProps {
  params: {
    translations: {
      [key: string]: string;
    };
  };
}
```

### **2. Internationalization**

```tsx
// Container
const { translations: t } = params;

// View
const { translations: t } = params;
```

### **3. Error Handling**

```tsx
// Container
export const HomeContainer: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;

  if (!t) {
    return <ErrorView />;
  }

  return <HomeView params={{ translations: t }} />;
};
```

## 📊 Testing Strategy

### **1. Container Testing**

```tsx
import { render, screen } from "@testing-library/react";
import { HomeContainer } from "./home.container";

describe("HomeContainer", () => {
  it("should render with translations", () => {
    const mockParams = {
      translations: {
        title: "Test Title",
        description: "Test Description",
      },
    };

    render(<HomeContainer params={mockParams} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });
});
```

### **2. View Testing**

```tsx
import { render, screen } from "@testing-library/react";
import { HomeView } from "./home.view";

describe("HomeView", () => {
  it("should render correctly", () => {
    const mockParams = {
      translations: {
        title: "Test Title",
        description: "Test Description",
      },
    };

    render(<HomeView params={mockParams} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });
});
```

## 🚀 Advanced Patterns

### **1. Custom Hooks in Containers**

```tsx
// Container
export const HomeContainer: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;
  const { data, loading, error } = useHomeData();

  if (loading) return <LoadingView />;
  if (error) return <ErrorView error={error} />;

  return <HomeView params={{ translations: t, data }} />;
};
```

### **2. Multiple Views**

```tsx
// Container
export const HomeContainer: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;
  const { isMobile } = useMobile();

  return isMobile ? (
    <HomeMobileView params={{ translations: t }} />
  ) : (
    <HomeDesktopView params={{ translations: t }} />
  );
};
```

### **3. Conditional Rendering**

```tsx
// Container
export const HomeContainer: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;
  const { user } = useAuth();

  if (!user) {
    return <LoginView params={{ translations: t }} />;
  }

  return <HomeView params={{ translations: t, user }} />;
};
```

## 📚 Best Practices

### **1. Naming Conventions**

- **Container**: `ComponentName.container.tsx`
- **View**: `ComponentName.view.tsx`
- **Types**: `ComponentName.types.ts`

### **2. File Organization**

```
component/
├── container/
│   └── component.container.tsx
├── view/
│   └── component.view.tsx
├── types/
│   └── component.types.ts
└── index.ts
```

### **3. Import Structure**

```tsx
// Container imports
import { ComponentView } from "./view/component.view";
import { useComponentData } from "@/core/modules/hooks";

// View imports
import { ComponentProps } from "./types/component.types";
import { UIComponents } from "@/core/modules/components/ui";
```

### **4. Error Boundaries**

```tsx
// Container with Error Boundary
export const HomeContainer: React.FC<PageProps> = ({ params }) => {
  return (
    <ErrorBoundary>
      <HomeView params={params} />
    </ErrorBoundary>
  );
};
```

## 🔍 Common Patterns

### **1. Data Fetching**

```tsx
// Container
export const HomeContainer: React.FC<PageProps> = ({ params }) => {
  const { data, loading } = useSWR("/api/home", fetcher);

  if (loading) return <LoadingView />;

  return <HomeView params={{ ...params, data }} />;
};
```

### **2. State Management**

```tsx
// Container
export const HomeContainer: React.FC<PageProps> = ({ params }) => {
  const [state, setState] = useState(initialState);

  const handleAction = useCallback((action) => {
    setState((prev) => ({ ...prev, ...action }));
  }, []);

  return <HomeView params={{ ...params, state, onAction: handleAction }} />;
};
```

### **3. Form Handling**

```tsx
// Container
export const FormContainer: React.FC<PageProps> = ({ params }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = useCallback((data) => {
    // Handle form submission
  }, []);

  return (
    <FormView
      params={{ ...params, register, handleSubmit, errors, onSubmit }}
    />
  );
};
```

---

**Last updated**: January 2025  
**Version**: 1.0.0  
**Author**: Antônio Silva
