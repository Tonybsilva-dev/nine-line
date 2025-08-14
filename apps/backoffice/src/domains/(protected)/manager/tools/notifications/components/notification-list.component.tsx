"use client";

import React, { useState } from "react";
import { Bell, Star, Archive, Trash2 } from "lucide-react";
import { Button } from "@nine-line/ui";
import { Small } from "@nine-line/ui";
import { Iconify } from "@/core/modules/components/custom";

import { NotificationFilter, Notification } from "../types";

interface NotificationListProps {
  filter: NotificationFilter;
  notifications: Notification[];
  onNotificationUpdate: (id: string, updates: Partial<Notification>) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  translations: (key: string) => string;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  filter,
  notifications,
  onNotificationUpdate,
  onMarkAllAsRead,
  onDeleteNotification,
  translations,
}) => {
  const [clickedNotifications, setClickedNotifications] = useState<Set<string>>(
    new Set(),
  );

  // Limpar notificações clicadas após 2 segundos
  React.useEffect(() => {
    if (clickedNotifications.size > 0) {
      const timer = setTimeout(() => {
        setClickedNotifications(new Set());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [clickedNotifications]);

  const getFilteredNotifications = () => {
    switch (filter) {
      case "archived":
        return notifications.filter((notification) => notification.isArchived);
      case "favorite":
        return notifications.filter((notification) => notification.isFavorite);
      default:
        return notifications.filter((notification) => !notification.isArchived);
    }
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = filteredNotifications.filter((n) => !n.isRead).length;

  const handleMarkAllAsRead = () => {
    onMarkAllAsRead();
  };

  const handleToggleFavorite = (id: string) => {
    const notification = notifications.find((n) => n.id === id);
    if (notification) {
      onNotificationUpdate(id, { isFavorite: !notification.isFavorite });
    }
  };

  const handleToggleArchive = (id: string) => {
    const notification = notifications.find((n) => n.id === id);
    if (notification) {
      onNotificationUpdate(id, { isArchived: !notification.isArchived });
    }
  };

  const handleDelete = (id: string) => {
    onDeleteNotification(id);
  };

  if (filteredNotifications.length === 0) {
    return (
      <div className="text-center py-12">
        <Iconify
          icon={Bell}
          className="h-12 w-12 text-muted-foreground mx-auto mb-4"
        />
        <Small className="text-muted-foreground text-lg">
          {filter === "archived"
            ? translations("empty.archived")
            : filter === "favorite"
              ? translations("empty.favorite")
              : translations("empty.all")}
        </Small>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header com contadores e ações */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {filteredNotifications.length}{" "}
            {filter === "all"
              ? "notificações"
              : filter === "archived"
                ? "arquivadas"
                : "favoritadas"}
          </div>
          {filter === "all" && unreadCount > 0 && (
            <div className="text-sm text-muted-foreground">
              {unreadCount} não lidas
            </div>
          )}
        </div>

        {filter === "all" && unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllAsRead}
            className="text-xs"
          >
            Marcar todas como lidas
          </Button>
        )}
      </div>

      {/* Lista de notificações */}
      <div className="space-y-2">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg border transition-all hover:shadow-sm cursor-pointer ${
              notification.isRead
                ? "bg-background border-border"
                : "bg-primary/5 border-primary/20"
            }`}
            onClick={() => {
              if (
                !notification.isRead &&
                !clickedNotifications.has(notification.id)
              ) {
                setClickedNotifications((prev) =>
                  new Set(prev).add(notification.id),
                );
                onNotificationUpdate(notification.id, { isRead: true });
              }
            }}
          >
            <div className="flex items-start gap-3">
              {/* Indicadores de status */}
              <div className="flex flex-col items-center gap-1 pt-1">
                {/* Status de leitura */}
                <div
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    clickedNotifications.has(notification.id)
                      ? "bg-green-500"
                      : notification.isRead
                        ? "bg-muted"
                        : "bg-primary"
                  }`}
                  title={
                    clickedNotifications.has(notification.id)
                      ? "Marcando como lida..."
                      : notification.isRead
                        ? "Já lida"
                        : "Não lida"
                  }
                />

                {/* Status de favorito */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavorite(notification.id);
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Iconify
                    icon={Star}
                    className={`h-3 w-3 ${
                      notification.isFavorite ? "fill-current text-primary" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Conteúdo da notificação */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-medium text-sm ${
                        notification.isRead
                          ? "text-foreground"
                          : "text-foreground font-semibold"
                      }`}
                    >
                      {notification.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                  </div>

                  {/* Timestamp e ações */}
                  <div className="flex flex-col items-end gap-2 text-xs text-muted-foreground">
                    <span>{notification.timestamp}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleArchive(notification.id);
                        }}
                        className="p-1 hover:bg-muted rounded transition-colors"
                        title={
                          notification.isArchived ? "Desarquivar" : "Arquivar"
                        }
                      >
                        <Iconify icon={Archive} className="h-3 w-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(notification.id);
                        }}
                        className="p-1 hover:bg-muted rounded transition-colors text-destructive"
                        title="Excluir"
                      >
                        <Iconify icon={Trash2} className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Ações da notificação */}
                {notification.actions && (
                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        notification.actions?.accept?.();
                      }}
                      className="text-xs h-7"
                    >
                      Aceitar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        notification.actions?.reject?.();
                      }}
                      className="text-xs h-7 text-destructive"
                    >
                      Recusar
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
