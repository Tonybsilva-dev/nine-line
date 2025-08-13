export type NotificationFilter = "all" | "archived" | "favorite";

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isArchived: boolean;
  isFavorite: boolean;
  type: "info" | "warning" | "success" | "error";
  hasActions?: boolean;
  actions?: {
    accept?: () => void;
    reject?: () => void;
  };
}
