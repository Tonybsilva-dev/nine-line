"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import { useTheme } from "@/core/modules/hooks/use-theme.hook";
import { Iconify } from "@/core/modules/components/custom";
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@nine-line/ui";

type ThemeSwitcherProps = {
  compact?: boolean;
};

export function ThemeSwitcher({ compact }: ThemeSwitcherProps) {
  const { theme, resolvedTheme, changeTheme } = useTheme();
  const t = useTranslations("components.theme-switcher");
  const [mounted, setMounted] = useState(false);

  // Evitar hidratação incorreta
  useEffect(() => {
    setMounted(true);
  }, []);

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return t("options.light");
      case "dark":
        return t("options.dark");
      case "system":
        return t("options.system");
      default:
        return t("options.system");
    }
  };

  // Renderizar placeholder até o componente estar montado
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size={compact ? "icon" : "sm"}
        className={compact ? "" : "gap-2"}
        disabled
      >
        <div className="h-4 w-4" />
        {!compact && (
          <span className="w-16 h-4 bg-muted rounded animate-pulse" />
        )}
      </Button>
    );
  }

  if (compact) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Iconify
              icon={resolvedTheme === "dark" ? Moon : Sun}
              className="h-4 w-4"
            />
            <span className="sr-only">{t("sr-only.aria-label.select")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => changeTheme("light")}>
            <Sun className="mr-2 h-4 w-4" />
            {t("options.light")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeTheme("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            {t("options.dark")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeTheme("system")}>
            <Monitor className="mr-2 h-4 w-4" />
            {t("options.system")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          {theme === "system" ? (
            <Monitor className="h-4 w-4" />
          ) : resolvedTheme === "dark" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
          <span>{getThemeLabel()}</span>
          <span className="sr-only">{t("sr-only.aria-label.select")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          {t("options.light")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          {t("options.dark")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          {t("options.system")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
