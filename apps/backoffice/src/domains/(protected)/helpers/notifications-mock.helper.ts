import {
  Bell,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

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

export const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "info":
      return MessageSquare;
    case "warning":
      return AlertTriangle;
    case "success":
      return CheckCircle;
    case "error":
      return XCircle;
    default:
      return Bell;
  }
};

export const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "info":
      return "text-blue-500";
    case "warning":
      return "text-yellow-500";
    case "success":
      return "text-green-500";
    case "error":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Novo Cliente Registrado",
    message:
      "Hello Sales Marketing Team, We're pleased to inform you that a new customer has registered! Please follow up promptly by contacting.",
    timestamp: "Just Now",
    isRead: false,
    isArchived: false,
    isFavorite: false,
    type: "info",
    hasActions: true,
    actions: {
      accept: () => console.log("Cliente aceito"),
      reject: () => console.log("Cliente rejeitado"),
    },
  },
  {
    id: "2",
    title: "Oferta Especial",
    message:
      "Hello Sales Marketing Team, We have a special offer for our customers! Enjoy a 20% discount on selected products.",
    timestamp: "30 min ago",
    isRead: true,
    isArchived: false,
    isFavorite: true,
    type: "success",
    hasActions: false,
  },
  {
    id: "3",
    title: "Meta de Vendas",
    message:
      "Hello Sales Marketing Team, This is a reminder to achieve this month's sales target. Currently, we've reached 75% of our goal.",
    timestamp: "2 hours ago",
    isRead: false,
    isArchived: false,
    isFavorite: false,
    type: "warning",
    hasActions: false,
  },
  {
    id: "4",
    title: "Solicitação de Informações",
    message:
      "Hello Sales Marketing Team, We've received a product information request from a potential customer.",
    timestamp: "1 day ago",
    isRead: true,
    isArchived: false,
    isFavorite: true,
    type: "info",
    hasActions: true,
    actions: {
      accept: () => console.log("Solicitação aceita"),
      reject: () => console.log("Solicitação rejeitada"),
    },
  },
  {
    id: "5",
    title: "Reunião Agendada",
    message:
      "Hello Sales Marketing Team, A meeting or presentation has been scheduled with a customer/prospect.",
    timestamp: "2 days ago",
    isRead: false,
    isArchived: false,
    isFavorite: false,
    type: "info",
    hasActions: false,
  },
  {
    id: "6",
    title: "Revisão de Contrato",
    message:
      "Hello Sales Marketing Team, This is a reminder to review the contract or proposal currently under consideration.",
    timestamp: "3 days ago",
    isRead: false,
    isArchived: false,
    isFavorite: false,
    type: "warning",
    hasActions: false,
  },
  {
    id: "7",
    title: "Follow-up com Cliente",
    message:
      "Hello Sales Marketing Team, It's time for a follow-up with a customer after their recent purchase/meeting.",
    timestamp: "4 days ago",
    isRead: true,
    isArchived: false,
    isFavorite: false,
    type: "info",
    hasActions: false,
  },
  {
    id: "8",
    title: "Feedback Positivo",
    message:
      "Hello Sales Marketing Team, We've received positive feedback/testimonial from a satisfied customer.",
    timestamp: "5 days ago",
    isRead: true,
    isArchived: false,
    isFavorite: false,
    type: "success",
    hasActions: false,
  },
  {
    id: "9",
    title: "Pagamento Pendente",
    message:
      "Hello Sales Marketing Team, This is a reminder regarding an outstanding payment from a customer.",
    timestamp: "1 week ago",
    isRead: false,
    isArchived: false,
    isFavorite: false,
    type: "error",
    hasActions: true,
    actions: {
      accept: () => console.log("Pagamento confirmado"),
      reject: () => console.log("Pagamento rejeitado"),
    },
  },
  {
    id: "10",
    title: "Relatório Mensal",
    message:
      "Hello Sales Marketing Team, Your monthly sales report is ready for review.",
    timestamp: "1 week ago",
    isRead: false,
    isArchived: false,
    isFavorite: false,
    type: "info",
    hasActions: false,
  },
  {
    id: "11",
    title: "Notificação Arquivada 1",
    message: "Esta é uma notificação arquivada para teste.",
    timestamp: "2 weeks ago",
    isRead: true,
    isArchived: true,
    isFavorite: false,
    type: "info",
    hasActions: false,
  },
  {
    id: "12",
    title: "Notificação Arquivada 2",
    message: "Outra notificação arquivada para teste.",
    timestamp: "3 weeks ago",
    isRead: true,
    isArchived: true,
    isFavorite: false,
    type: "warning",
    hasActions: false,
  },
];

export const getFilteredNotifications = (
  filter: "all" | "archived" | "favorite",
) => {
  switch (filter) {
    case "archived":
      return MOCK_NOTIFICATIONS.filter(
        (notification) => notification.isArchived,
      );
    case "favorite":
      return MOCK_NOTIFICATIONS.filter(
        (notification) => notification.isFavorite,
      );
    default:
      return MOCK_NOTIFICATIONS.filter(
        (notification) => !notification.isArchived,
      );
  }
};

export const getNotificationCounts = () => {
  const all = MOCK_NOTIFICATIONS.filter((n) => !n.isArchived).length;
  const archived = MOCK_NOTIFICATIONS.filter((n) => n.isArchived).length;
  const favorite = MOCK_NOTIFICATIONS.filter(
    (n) => n.isFavorite && !n.isArchived,
  ).length;
  const unread = MOCK_NOTIFICATIONS.filter(
    (n) => !n.isRead && !n.isArchived,
  ).length;

  return { all, archived, favorite, unread };
};

export const markNotificationAsRead = (id: string) => {
  const notification = MOCK_NOTIFICATIONS.find((n) => n.id === id);
  if (notification) {
    notification.isRead = true;
  }
};

export const markAllNotificationsAsRead = () => {
  MOCK_NOTIFICATIONS.forEach((notification) => {
    if (!notification.isArchived) {
      notification.isRead = true;
    }
  });
};

export const toggleFavorite = (id: string) => {
  const notification = MOCK_NOTIFICATIONS.find((n) => n.id === id);
  if (notification) {
    notification.isFavorite = !notification.isFavorite;
  }
};

export const toggleArchive = (id: string) => {
  const notification = MOCK_NOTIFICATIONS.find((n) => n.id === id);
  if (notification) {
    notification.isArchived = !notification.isArchived;
  }
};

export const deleteNotification = (id: string) => {
  const index = MOCK_NOTIFICATIONS.findIndex((n) => n.id === id);
  if (index !== -1) {
    MOCK_NOTIFICATIONS.splice(index, 1);
  }
};
