import { User, UserRole } from "@/core/@types/user.types";

export const MOCK_BACKOFFICE_USER: User = {
  id: "1",
  name: "Administrador",
  email: "admin@pedidocerto.com",
  role: "backoffice",
  avatar: undefined,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCK_MANAGER_USER: User = {
  id: "2",
  name: "Gerente",
  email: "gerente@pedidocerto.com",
  role: "manager",
  avatar: undefined,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCK_DASHBOARD_STATS = {
  totalOrders: 1247,
  pendingOrders: 47,
  totalRevenue: 125000,
  monthlyGrowth: 18.5,
  lowStockItems: 8,
  activeDeliveries: 23,
  completedDeliveries: 156,
  averageDeliveryTime: 2.3,
  customerSatisfaction: 4.8,
  returnRate: 2.1,
};

export const getMockUserByRole = (role: UserRole): User => {
  return role === "backoffice" ? MOCK_BACKOFFICE_USER : MOCK_MANAGER_USER;
};
