"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Eye } from "lucide-react";
import { useTranslations } from "next-intl";

import { Iconify } from "@/core/modules/components/custom";
import {
  Notification,
  getNotificationIcon,
  getNotificationColor,
  getFilteredNotifications,
  getNotificationCounts,
  markNotificationAsRead,
} from "@/domains/(protected)/helpers/notifications-mock.helper";
import { User } from "@/core/@types/user.types";
import {
  H4,
  Small,
  Button,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@nine-line/ui";

interface NotificationDropdownProps {
  compact?: boolean;
  user?: User;
}

export function NotificationDropdown({
  compact,
  user,
}: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations("components.notifications");

  // Função para determinar a rota baseada no role do usuário
  const getNotificationsRoute = () => {
    if (!user) return "/manager/tools/notifications"; // fallback

    switch (user.role) {
      case "backoffice":
        return "/backoffice/tools/notifications";
      case "manager":
        return "/manager/tools/notifications";
      default:
        return "/manager/tools/notifications"; // fallback
    }
  };

  const { unread } = getNotificationCounts();
  const recentNotifications = getFilteredNotifications("all").filter(
    (n) => !n.isRead,
  );

  const handleNotificationClick = (notification: Notification) => {
    markNotificationAsRead(notification.id);
  };

  const NotificationContent = () => {
    return (
      <div className={compact ? "p-3" : "p-0"}>
        {/* Header com ícone e título */}
        <div className="flex flex-col items-center py-4 border-b border-muted/20">
          <div className="relative mb-2">
            <Iconify icon={Bell} className="h-6 w-6 text-muted-foreground" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unread > 9 ? "9+" : unread}
              </span>
            )}
          </div>
          <H4 className="text-muted-foreground text-center">{t("title")}</H4>
        </div>

        {/* Lista de notificações */}
        {recentNotifications.length > 0 ? (
          <div className="max-h-80 overflow-y-auto">
            {recentNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={() => handleNotificationClick(notification)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Iconify
              icon={Bell}
              className="h-8 w-8 text-muted-foreground mx-auto mb-2"
            />
            <Small className="text-muted-foreground">{t("empty")}</Small>
          </div>
        )}

        {/* Footer com botão "Ver todas" */}
        {recentNotifications.length > 0 && (
          <div className="border-t border-muted/20">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
              onClick={() => {
                router.push(getNotificationsRoute());
                setIsOpen(false);
              }}
            >
              <Eye className="h-4 w-4" />
              {t("viewAll")}
            </Button>
          </div>
        )}
      </div>
    );
  };

  if (compact) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Iconify icon={Bell} className="text-muted-foreground" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unread > 9 ? "9+" : unread}
              </span>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-background">
          <DrawerHeader className="border-b">
            <DrawerTitle>{t("title")}</DrawerTitle>
          </DrawerHeader>
          <div className="max-h-[70vh] overflow-y-auto">
            <NotificationContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Iconify icon={Bell} className="text-muted-foreground" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 border-0 shadow-lg bg-background"
      >
        <NotificationContent />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
}

function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const Icon = getNotificationIcon(notification.type);
  const iconColor = getNotificationColor(notification.type);

  return (
    <div
      className="p-4 cursor-pointer transition-colors w-full hover:bg-muted/30 border-b border-muted/10 last:border-b-0"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {/* Avatar com ícone sobreposto */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {notification.title.charAt(0).toUpperCase()}
            </span>
          </div>
          <div
            className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-sm ${iconColor} flex items-center justify-center`}
          >
            <Icon className="h-3 w-3 text-white" />
          </div>
        </div>

        {/* Conteúdo da notificação */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <Small className="font-medium text-foreground line-clamp-2 leading-relaxed">
                {notification.title}
              </Small>
              <Small className="text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                {notification.message}
              </Small>
              <Small className="text-cyan-400 mt-2 text-xs">
                {notification.timestamp}
              </Small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
