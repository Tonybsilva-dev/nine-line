"use client";

import React, { useState } from "react";
import { cn } from "@/core/modules/utils/cn.utils";
import { Button } from "@nine-line/ui";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@nine-line/ui";
import { H3, Small } from "@nine-line/ui";
import { useIsMobile } from "@/core/modules/hooks/use.mobile.hook";
import { NavigationItem, User } from "@/core/@types/user.types";
import { Iconify } from "@/core/modules/components/custom";
import { getNotificationCounts } from "@/domains/(protected)/helpers/notifications-mock.helper";
import {
  LanguageSwitcher,
  ThemeSwitcher,
  NotificationDropdown,
  Breadcrumbs,
  UserDropdown,
  CollapsibleNavigation,
} from "@/core/modules/components/custom";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

interface FilteredLayoutProps {
  children: React.ReactNode;
  user: User;
  navigation: NavigationItem[];
  breadcrumbs?: Array<{
    label: string;
    href?: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
  sidebarContent: React.ReactNode;
  sidebarTitle: string;
}

export const FilteredLayout: React.FC<FilteredLayoutProps> = ({
  children,
  user,
  navigation,
  breadcrumbs = [],
  sidebarContent,
  sidebarTitle,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const t = useTranslations("app");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex h-screen">
          {/* Sidebar Skeleton */}
          <div className="w-64 bg-card border-r border-border">
            {/* Header Skeleton */}
            <div className="h-16 border-b border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-3 w-32 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* User Dropdown Skeleton */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
                <div className="space-y-1">
                  <div className="h-3 w-20 bg-muted rounded animate-pulse" />
                  <div className="h-2 w-16 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Navigation Skeleton */}
            <div className="p-4 space-y-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-muted rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1">
            {/* Top Bar Skeleton */}
            <div className="h-16 bg-card border-b border-border px-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-muted rounded animate-pulse" />
                <div className="w-8 h-8 bg-muted rounded animate-pulse" />
                <div className="w-8 h-8 bg-muted rounded animate-pulse" />
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="p-6 space-y-6">
              {/* Header Skeleton */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-lg animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-8 w-48 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-64 bg-muted rounded animate-pulse" />
                  </div>
                </div>
                <div className="w-10 h-10 bg-muted rounded-lg animate-pulse" />
              </div>

              {/* Filter Bar Skeleton */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                </div>
                <div className="h-8 w-32 bg-muted rounded animate-pulse" />
              </div>

              {/* Items Skeleton */}
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-20 bg-muted rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-card border-r border-border transform transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-16" : "w-64 sm:w-72",
          isMobile
            ? sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0",
        )}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Iconify
                icon={LayoutDashboard}
                className="text-primary-foreground text-lg"
              />
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col min-w-0">
                <H3 className="text-card-foreground truncate text-sm sm:text-base">
                  {t("name")}
                </H3>
                <Small className="text-muted-foreground text-xs truncate hidden sm:block">
                  {t("tagline")}
                </Small>
              </div>
            )}
          </div>
          {!sidebarCollapsed && isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <Iconify icon={X} className="text-muted-foreground" />
            </Button>
          )}
        </div>

        <div
          className={cn(
            "border-b border-border",
            sidebarCollapsed ? "p-2 flex justify-center" : "p-4",
          )}
        >
          <UserDropdown user={user} compact={sidebarCollapsed} />
        </div>

        <div
          className={cn("flex-1", sidebarCollapsed ? "p-2" : "p-4")}
          suppressHydrationWarning
        >
          <CollapsibleNavigation
            items={navigation}
            collapsed={sidebarCollapsed}
            getDynamicBadge={(itemId) => {
              if (itemId === "notifications") {
                const { unread } = getNotificationCounts();
                return unread > 0 ? unread : undefined;
              }
              return undefined;
            }}
          />
        </div>

        {!isMobile && (
          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 rounded-full bg-card border border-border shadow-sm"
              onClick={toggleSidebarCollapse}
            >
              <Iconify
                icon={sidebarCollapsed ? ChevronRight : ChevronLeft}
                className="h-3 w-3"
              />
            </Button>
          </div>
        )}
      </aside>

      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "ml-16" : "ml-64 sm:ml-72",
          isMobile && "ml-0",
        )}
      >
        <header
          className="bg-card border-b border-border px-3 sm:px-4 h-16 flex items-center"
          suppressHydrationWarning
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {isMobile && (
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                  <Iconify icon={Menu} className="text-muted-foreground" />
                </Button>
              )}

              {!isMobile && <Breadcrumbs items={breadcrumbs} />}
            </div>

            <div className="flex items-center space-x-1 sm:space-x-4">
              <LanguageSwitcher compact={isMobile} />
              <ThemeSwitcher compact={isMobile} />
              <NotificationDropdown compact={isMobile} user={user} />
            </div>
          </div>
        </header>

        <div className="flex h-[calc(100vh-4rem)]">
          {!isMobile && (
            <aside className="w-80 border-r border-border bg-card/50">
              <div className="px-4 py-2 border-b border-border">
                <H3 className="text-lg font-semibold text-foreground">
                  {sidebarTitle}
                </H3>
                <Small className="text-muted-foreground">
                  Filtre e organize suas informações
                </Small>
              </div>
              <div className="p-4">{sidebarContent}</div>
            </aside>
          )}

          <main
            className="flex-1 p-3 sm:p-6 overflow-auto"
            suppressHydrationWarning
          >
            {isMobile && (
              <div className="mb-4">
                <Drawer
                  open={filterDrawerOpen}
                  onOpenChange={setFilterDrawerOpen}
                >
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      Filtros
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>{sidebarTitle}</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4">{sidebarContent}</div>
                  </DrawerContent>
                </Drawer>
              </div>
            )}

            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
