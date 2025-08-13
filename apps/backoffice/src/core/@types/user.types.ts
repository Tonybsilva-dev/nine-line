export type UserRole = "backoffice" | "manager";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  badge?: number;
  isActive?: boolean;
  isBackoffice?: boolean;
  children?: NavigationItem[];
  expanded?: boolean;
}
