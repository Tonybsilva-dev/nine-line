"use client";

import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "@/core/modules/hooks/use-theme.hook";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Garantir que o componente só execute no cliente
  useEffect(() => {
    setMounted(true);
    console.log("ThemeProvider mounted");
  }, []);

  // Apenas monitorar mudanças para debug
  useEffect(() => {
    if (mounted && resolvedTheme) {
      console.log("ThemeProvider detected theme change:", resolvedTheme);
    }
  }, [resolvedTheme, mounted]);

  return <>{children}</>;
};
