"use client";

import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { useTranslations } from "next-intl";
import { Iconify } from "@/core/modules/components/custom";
import { cn } from "@/core/modules/utils/cn.utils";
import { Button } from "@nine-line/ui";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const t = useTranslations("navigation");

  return (
    <nav className={cn("flex items-center space-x-1 text-sm", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 px-2 text-muted-foreground hover:text-foreground"
      >
        <Iconify icon={Home} className="h-3 w-3" />
      </Button>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          {index === items.length - 1 ? (
            <span className="text-foreground font-medium">
              {item.icon && <item.icon className="h-3 w-3 inline mr-1" />}
              {t(item.label)}
            </span>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-muted-foreground hover:text-foreground"
            >
              {item.icon && <item.icon className="h-3 w-3 mr-1" />}
              {t(item.label)}
            </Button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
