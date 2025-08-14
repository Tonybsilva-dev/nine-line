"use client";

import React from "react";
import { Notification } from "../../../../helpers/notifications-mock.helper";
import {
  getNotificationIcon,
  getNotificationColor,
} from "../../../../helpers/notifications-mock.helper";
import { MoreVertical, CheckCircle, Clock } from "lucide-react";
import { Button } from "@nine-line/ui";
import { Small } from "@nine-line/ui";
import { cn } from "@/core/modules/utils/cn.utils";

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
  onUpdate: (notification: Notification) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClick,
  onUpdate,
}) => {
  const Icon = getNotificationIcon(notification.type);
  const iconColor = getNotificationColor(notification.type);

  const getStatusIcon = () => {
    if (notification.isRead) {
      return <Clock className="h-3 w-3 text-muted-foreground" />;
    }
    return <div className="w-2 h-2 rounded-full bg-primary"></div>;
  };

  const handleAction = (actionType: "accept" | "reject") => {
    if (notification.actions?.[actionType]) {
      notification.actions[actionType]?.();
      // Marcar como lida após ação
      if (!notification.isRead) {
        const updatedNotification = { ...notification, isRead: true };
        onUpdate(updatedNotification);
      }
    }
  };

  return (
    <div
      className={cn(
        "group relative p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-all duration-200 cursor-pointer",
        !notification.isRead && "bg-muted/30 border-primary/20 shadow-sm",
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Avatar com ícone sobreposto */}
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {notification.title.charAt(0).toUpperCase()}
            </span>
          </div>
          <div
            className={cn(
              "absolute -bottom-1 -right-1 w-6 h-6 rounded-sm flex items-center justify-center",
              iconColor,
            )}
          >
            <Icon className="h-3 w-3 text-white" />
          </div>
        </div>

        {/* Conteúdo da notificação */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <Small className="font-semibold text-foreground line-clamp-2 leading-relaxed">
                {notification.title}
              </Small>
              <Small className="text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                {notification.message}
              </Small>

              {/* Timestamp e status */}
              <div className="flex items-center gap-2 mt-3">
                <Small className="text-cyan-500 text-xs font-medium flex items-center gap-1">
                  {getStatusIcon()}
                  {notification.timestamp}
                </Small>
                {notification.hasActions && (
                  <Small className="text-xs text-orange-500 font-medium px-2 py-1 bg-orange-50 rounded-full">
                    Requer ação
                  </Small>
                )}
              </div>
            </div>

            {/* Botão de ações */}
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                // Aqui você pode adicionar um menu de ações
                console.log("Notification actions for:", notification.id);
              }}
            >
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          {/* Ações da notificação (se houver) */}
          {notification.hasActions && notification.actions && (
            <div className="flex gap-2 mt-4 pt-3 border-t border-border/50">
              {notification.actions.accept && (
                <Button
                  size="sm"
                  variant="default"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction("accept");
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Aceitar
                </Button>
              )}
              {notification.actions.reject && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction("reject");
                  }}
                >
                  Recusar
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
