"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Iconify } from "@/core/modules/components/custom";
import { getIconComponent } from "@/domains/(protected)/helpers/icon-mapping.helper";
import { NavigationItem } from "@/core/@types/user.types";
import { cn } from "@/core/modules/utils/cn.utils";
import { ChevronDown, ChevronRight, AlertCircle } from "lucide-react";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@nine-line/ui";

interface CollapsibleNavigationProps {
  items: NavigationItem[];
  className?: string;
  collapsed?: boolean;
  getDynamicBadge?: (itemId: string) => number | undefined;
}

export function CollapsibleNavigation({
  items,
  className,
  collapsed = false,
  getDynamicBadge,
}: CollapsibleNavigationProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("navigation");

  // Expandir automaticamente itens que contêm a página ativa
  React.useEffect(() => {
    const newExpanded = new Set<string>();
    items.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => child.href === pathname,
        );
        if (hasActiveChild) {
          newExpanded.add(item.id);
        }
      }
    });
    setExpandedItems(newExpanded);
  }, [pathname, items]);

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleNavigation = (href: string, isActive: boolean = true) => {
    if (!isActive) {
      // Mostrar tooltip ou toast de funcionalidade não disponível
      console.log("Funcionalidade não disponível no momento");
      return;
    }
    router.push(href);
  };

  const isActive = (item: NavigationItem) => {
    if (item.href === pathname) return true;
    if (item.children) {
      return item.children.some((child) => child.href === pathname);
    }
    return false;
  };

  const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const active = isActive(item);
    const isItemActive = item.isActive !== false; // Default true se não especificado

    const NavigationButton = () => (
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
          level > 0 && "ml-0",
          level > 0 && "text-sm",
          collapsed && "justify-center px-2",
          active
            ? "bg-primary text-primary-foreground"
            : level > 0
              ? "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              : "text-card-foreground hover:bg-accent hover:text-accent-foreground",
          !isItemActive && "opacity-50 cursor-not-allowed",
        )}
        onClick={() => {
          if (hasChildren) {
            toggleExpanded(item.id);
          } else {
            handleNavigation(item.href, isItemActive);
          }
        }}
        disabled={!isItemActive}
      >
        <div className="flex items-center space-x-3">
          {item.icon && (
            <Iconify
              icon={getIconComponent(item.icon)}
              className={level > 0 ? "text-sm" : "text-lg"}
            />
          )}
          {!collapsed && <span>{t(item.id) || item.id}</span>}
        </div>
        {!collapsed && (
          <div className="flex items-center space-x-2">
            {(getDynamicBadge ? getDynamicBadge(item.id) : item.badge) && (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                {getDynamicBadge ? getDynamicBadge(item.id) : item.badge}
              </span>
            )}
            {hasChildren && (
              <Iconify
                icon={isExpanded ? ChevronDown : ChevronRight}
                className="h-4 w-4 transition-transform duration-200"
              />
            )}
            {!isItemActive && (
              <Iconify
                icon={AlertCircle}
                className="h-4 w-4 text-muted-foreground"
              />
            )}
          </div>
        )}
      </Button>
    );

    return (
      <div key={item.id} className="space-y-1">
        {!isItemActive ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavigationButton />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Funcionalidade não disponível no momento</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <NavigationButton />
        )}

        {hasChildren && isExpanded && (
          <div className="space-y-1 mt-1 border-l border-border ml-4 pl-2">
            {item.children!.map((child) =>
              renderNavigationItem(child, level + 1),
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={cn("space-y-2", className)} suppressHydrationWarning>
      {items.map((item) => renderNavigationItem(item))}
    </nav>
  );
}
