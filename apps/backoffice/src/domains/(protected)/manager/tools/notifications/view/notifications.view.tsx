"use client";

import React from "react";
import { Bell, Settings } from "lucide-react";
import { Button } from "@nine-line/ui";
import { NotificationList, NotificationSkeleton } from "../components";
import { NotificationFilter } from "../types";
import { getNotificationCounts } from "../../../../helpers/notifications-mock.helper";
import { IconWithBackground } from "@/core/modules/components/custom";
import { Notification } from "../types";

interface NotificationsViewProps {
  activeFilter: NotificationFilter;
  notifications: Notification[];
  onNotificationUpdate: (id: string, updates: Partial<Notification>) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  isLoading: boolean;
  params: {
    translations: (key: string) => string;
  };
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  activeFilter,
  notifications,
  onNotificationUpdate,
  onMarkAllAsRead,
  onDeleteNotification,
  isLoading,
  params,
}) => {
  const t = params.translations;
  const counts = getNotificationCounts();

  if (isLoading) {
    return <NotificationSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Bell className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {counts.all} {t("title")}
            </h1>
            <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
            <p className="text-sm text-muted-foreground">
              {counts.all} notificações • {counts.unread} não lidas
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="flex items-center">
            <div className="rounded-lg bg-primary/10">
              <IconWithBackground icon={Settings} />
            </div>
          </Button>
        </div>
      </div>

      {/* Lista de notificações */}
      <NotificationList
        filter={activeFilter}
        notifications={notifications}
        onNotificationUpdate={onNotificationUpdate}
        onMarkAllAsRead={onMarkAllAsRead}
        onDeleteNotification={onDeleteNotification}
        translations={t}
      />
    </div>
  );
};
