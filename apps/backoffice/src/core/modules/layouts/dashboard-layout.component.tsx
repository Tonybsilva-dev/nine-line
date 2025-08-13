"use client";

import React, { useState } from "react";
import { cn } from "@/core/modules/utils/cn.utils";
import { Button } from "@nine-line/ui";

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
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User;
  navigation: NavigationItem[];
  breadcrumbs?: Array<{
    label: string;
    href?: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  user,
  navigation,
  breadcrumbs = [],
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const t = useTranslations("app");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background" suppressHydrationWarning>
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
        suppressHydrationWarning
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

        <main className="p-3 sm:p-6" suppressHydrationWarning>
          {children}
        </main>
      </div>
    </div>
  );
};
