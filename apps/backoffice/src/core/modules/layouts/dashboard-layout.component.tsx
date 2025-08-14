"use client";

import React, { useState } from "react";
import { cn } from "@/core/modules/utils/cn.utils";
import { Button } from "@nine-line/ui";

import { useIsMobile } from "@/core/modules/hooks/use.mobile.hook";
import { NavigationItem, User } from "@/core/@types/user.types";
import { Iconify } from "@/core/modules/components/custom";
import { NotificationDropdown } from "@/core/modules/components/custom";
import { useTheme } from "@/core/modules/hooks/use-theme.hook";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@nine-line/ui";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Menu,
  Grid3X3,
  FileText,
  Settings,
  User as UserIcon,
  Package,
  ShoppingCart,
  TrendingUp,
  Store,
  Plus,
  MapPin,
  List,
  Database,
  Folder,
  DollarSign,
  Bell,
  Calendar,
  HelpCircle,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
  WavesLadderIcon,
  LogOut,
  Sun,
  Moon,
  Monitor,
  Globe,
} from "lucide-react";
import { useTranslations } from "next-intl";

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

export function DashboardLayout({
  children,
  user,
  navigation,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("playground");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const isMobile = useIsMobile();
  const { theme, changeTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("user");
  const tTheme = useTranslations("components.theme-switcher");
  const tLang = useTranslations("components.language-switcher");
  const pathname = usePathname();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Determina se a sidebar deve estar expandida (baseado no hover ou estado manual)
  const isSidebarExpanded = sidebarHovered || !sidebarOpen;

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    changeTheme(newTheme);
  };

  const handleLanguageChange = (newLocale: string) => {
    // Redirecionar para a nova localização
    const currentPath = pathname;
    const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  // Função para verificar se um item está ativo baseado na rota atual
  const isItemActive = (item: NavigationItem): boolean => {
    if (item.href === pathname) return true;
    if (item.children) {
      return item.children.some((child) => child.href === pathname);
    }
    return false;
  };

  // Função para verificar se um sub-item está ativo
  const isSubItemActive = (child: NavigationItem): boolean => {
    return child.href === pathname;
  };

  // Expandir automaticamente itens que contêm a página ativa
  React.useEffect(() => {
    const newExpanded = new Set<string>();
    navigation.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => child.href === pathname,
        );
        if (hasActiveChild) {
          newExpanded.add(item.id);
        }
      }
    });
    setExpandedItems(Array.from(newExpanded));
  }, [pathname, navigation]);

  // Abas do header (separadas da sidebar)
  const headerTabs = [
    { id: "playground", label: "Playground", icon: Grid3X3 },
    { id: "agent", label: "Agent", icon: UserIcon },
    { id: "tasks", label: "Tasks", icon: FileText },
    { id: "logs", label: "Logs", icon: Settings },
  ];

  // Função para obter o ícone baseado no nome
  const getIcon = (iconName: string) => {
    const iconMap: Record<
      string,
      React.ComponentType<{ className?: string }>
    > = {
      dashboard: LayoutDashboard,
      store: Store,
      package: Package,
      shoppingCart: ShoppingCart,
      trendingUp: TrendingUp,
      settings: Settings,
      list: List,
      database: Database,
      folder: Folder,
      dollarSign: DollarSign,
      bell: Bell,
      calendar: Calendar,
      helpCircle: HelpCircle,
      plus: Plus,
      mapPin: MapPin,
      grid: Grid3X3,
    };
    return iconMap[iconName] || LayoutDashboard;
  };

  return (
    <div className="min-h-screen bg-background" suppressHydrationWarning>
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar colapsada por padrão - design limpo sem linhas */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full bg-card transition-all duration-300 ease-in-out",
          isSidebarExpanded ? "w-64" : "w-16",
          isMobile && "w-64",
        )}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        {/* Perfil do usuário */}
        <div className="flex items-center space-x-3 p-4 h-16">
          <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center">
            <span className="text-destructive-foreground font-bold text-lg">
              <Iconify
                icon={WavesLadderIcon}
                className="h-8 w-8 text-primary transition-transform duration-200"
              />
            </span>
          </div>
          {isSidebarExpanded && (
            <div className="flex flex-col min-w-0">
              <span className="text-card-foreground font-medium text-sm truncate">
                {user.role === "manager" ? "Gerente" : "Admin"}
              </span>
              <span className="text-muted-foreground text-xs truncate">
                {user.email}
              </span>
            </div>
          )}
        </div>

        {/* Linha separadora sutil */}
        <div className="h-px bg-border mx-4 mb-4" />

        {/* Navegação da sidebar com dropdown */}
        <div className="flex-1 px-2 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = getIcon(item.icon || "dashboard");
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItems.includes(item.id);
            const isActive = isItemActive(item);

            return (
              <div key={item.id}>
                {/* Item principal */}
                <button
                  onClick={() =>
                    hasChildren ? toggleExpanded(item.id) : undefined
                  }
                  className={cn(
                    "w-full h-12 rounded-xl flex items-center justify-between px-3 transition-all duration-200 group relative",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={cn(
                        "h-5 w-5 transition-transform duration-200",
                        isActive ? "scale-110" : "group-hover:scale-105",
                      )}
                    />
                    {isSidebarExpanded && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </div>

                  {/* Seta de dropdown */}
                  {hasChildren && isSidebarExpanded && (
                    <Iconify
                      icon={isExpanded ? ChevronDown : ChevronRightIcon}
                      className="h-4 w-4 text-muted-foreground transition-transform duration-200"
                    />
                  )}
                </button>

                {/* Sub-itens */}
                {hasChildren && isExpanded && isSidebarExpanded && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children?.map((child) => {
                      const ChildIcon = getIcon(child.icon || "dashboard");
                      const isChildActive = isSubItemActive(child);

                      return (
                        <button
                          key={child.id}
                          className={cn(
                            "w-full h-10 rounded-lg flex items-center space-x-3 px-3 transition-all duration-200 group",
                            isChildActive
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-muted/20",
                          )}
                        >
                          <ChildIcon
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              isChildActive
                                ? "scale-110"
                                : "group-hover:scale-105",
                            )}
                          />
                          <span className="text-sm font-medium">
                            {child.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isSidebarExpanded ? "ml-64" : "ml-16",
          isMobile && "ml-0",
        )}
      >
        {/* Header com abas horizontais */}
        <header
          className="bg-card px-6 h-20 flex items-center shadow-sm"
          suppressHydrationWarning
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-1">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="mr-4"
                >
                  <Iconify icon={Menu} className="text-muted-foreground" />
                </Button>
              )}
            </div>

            {/* Abas horizontais centralizadas */}
            <div className="flex-1 flex justify-center">
              <div className="flex space-x-2">
                {headerTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 h-12",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Controles do usuário */}
            <div className="flex items-center space-x-4">
              <NotificationDropdown compact={isMobile} user={user} />

              {/* Avatar do usuário com dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="px-4 py-3 bg-muted rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-muted/80 transition-colors h-12">
                    <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-sm font-medium">
                        {user.name?.charAt(0) || "U"}
                      </span>
                    </div>
                    <span className="text-foreground text-sm font-medium hidden sm:block">
                      {user.name || "Usuário"}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-sm font-medium">
                        {user.name?.charAt(0) || "U"}
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Iconify icon={UserIcon} className="mr-2 h-4 w-4" />
                    <span>{t("profile")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Iconify icon={Settings} className="mr-2 h-4 w-4" />
                    <span>{t("settings")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Iconify icon={Bell} className="mr-2 h-4 w-4" />
                    <span>{t("notifications")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Iconify icon={Sun} className="mr-2 h-4 w-4" />
                      <span>{tTheme("label")}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onClick={() => handleThemeChange("light")}
                        className={theme === "light" ? "bg-accent" : ""}
                      >
                        <Iconify icon={Sun} className="mr-2 h-4 w-4" />
                        <span>{tTheme("options.light")}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleThemeChange("dark")}
                        className={theme === "dark" ? "bg-accent" : ""}
                      >
                        <Iconify icon={Moon} className="mr-2 h-4 w-4" />
                        <span>{tTheme("options.dark")}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleThemeChange("system")}
                        className={theme === "system" ? "bg-accent" : ""}
                      >
                        <Iconify icon={Monitor} className="mr-2 h-4 w-4" />
                        <span>{tTheme("options.system")}</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Iconify icon={Globe} className="mr-2 h-4 w-4" />
                      <span>{tLang("label")}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onClick={() => handleLanguageChange("pt")}
                      >
                        <span>🇧🇷 {tLang("options.pt")}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleLanguageChange("en")}
                      >
                        <span>🇺🇸 {tLang("options.en")}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleLanguageChange("es")}
                      >
                        <span>🇪🇸 {tLang("options.es")}</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Iconify icon={LogOut} className="mr-2 h-4 w-4" />
                    <span>{t("logout")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Conteúdo principal */}
        <main
          className={cn(
            "bg-background min-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out",
            isSidebarExpanded ? "p-6" : "p-4 pl-8",
            isMobile && "p-6",
          )}
          suppressHydrationWarning
        >
          {children}
        </main>
      </div>
    </div>
  );
}
