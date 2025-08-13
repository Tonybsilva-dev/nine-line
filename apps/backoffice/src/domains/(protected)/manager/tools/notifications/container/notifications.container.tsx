"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { FilteredLayout } from "@/core/modules/layouts/filtered-layout.component";
import { NotificationFilterBar } from "../components/notification-filter-bar.component";
import { NotificationsView } from "../view/notifications.view";
import { NotificationFilter } from "../types";
import {
  MOCK_NOTIFICATIONS,
  getNotificationCounts,
  markAllNotificationsAsRead,
  toggleFavorite,
  toggleArchive,
  deleteNotification,
} from "../../../../helpers/notifications-mock.helper";
import { MOCK_MANAGER_USER } from "../../../../helpers/dashboard-mock.helper";
import { DASHBOARD_NAVIGATION } from "@/core/modules/constants/dashboard.constants";

export const NotificationsContainer = () => {
  const t = useTranslations("dashboard.views.manager.notifications");
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simular carregamento
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleFilterChange = (filter: NotificationFilter) => {
    setActiveFilter(filter);
  };

  const handleNotificationUpdate = (
    id: string,
    updates: Partial<{
      isRead?: boolean;
      isFavorite?: boolean;
      isArchived?: boolean;
    }>,
  ) => {
    // Aplicar as mudanças no mock global
    if (updates.isRead !== undefined) {
      const notification = MOCK_NOTIFICATIONS.find((n) => n.id === id);
      if (notification) {
        notification.isRead = updates.isRead;
      }
    }

    if (updates.isFavorite !== undefined) {
      toggleFavorite(id);
    }

    if (updates.isArchived !== undefined) {
      toggleArchive(id);
    }

    // Atualizar o estado local
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates } : n)),
    );
  };

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead();
    setNotifications((prev) =>
      prev.map((n) => (!n.isArchived ? { ...n, isRead: true } : n)),
    );
  };

  const handleDeleteNotification = (id: string) => {
    deleteNotification(id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const navigation = DASHBOARD_NAVIGATION.manager
    .filter((item) => !item.isBackoffice)
    .map((item) => ({
      ...item,
      children: item.children?.filter((child) => !child.isBackoffice),
    }))
    .filter((item) => {
      if (!item.children) return true;
      return item.children.length > 0;
    });

  const breadcrumbs = [
    { label: "dashboard" },
    { label: "manager" },
    { label: "notifications" },
  ];

  const counts = getNotificationCounts();

  const sidebarContent = (
    <NotificationFilterBar
      activeFilter={activeFilter}
      onFilterChange={handleFilterChange}
      translations={t}
      isSidebar={true}
      counts={counts}
    />
  );

  return (
    <FilteredLayout
      user={MOCK_MANAGER_USER}
      navigation={navigation}
      breadcrumbs={breadcrumbs}
      sidebarContent={sidebarContent}
      sidebarTitle={t("filters.title")}
    >
      <NotificationsView
        activeFilter={activeFilter}
        notifications={notifications}
        onNotificationUpdate={handleNotificationUpdate}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDeleteNotification={handleDeleteNotification}
        isLoading={isLoading}
        params={{ translations: t }}
      />
    </FilteredLayout>
  );
};
