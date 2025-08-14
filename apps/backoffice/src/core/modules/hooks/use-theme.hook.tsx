"use client";

import Cookies from "js-cookie";
import { useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark" | "system";

const THEME_COOKIE = "NEXT_THEME";
const THEME_STORAGE = "NEXT_THEME";
const THEME_COOKIE_EXPIRES = 365; // 1 ano

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Inicializar com o valor do localStorage ou cookie se disponível
    if (typeof window !== "undefined") {
      // Priorizar localStorage, depois cookie
      const localTheme = localStorage.getItem(THEME_STORAGE) as Theme;
      const cookieTheme = Cookies.get(THEME_COOKIE) as Theme;

      const savedTheme = localTheme || cookieTheme;

      console.log(
        "useTheme init - localTheme:",
        localTheme,
        "cookieTheme:",
        cookieTheme,
        "savedTheme:",
        savedTheme,
      );

      if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
        return savedTheme;
      }
    }
    return "system";
  });

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() => {
    // Inicializar resolvedTheme baseado no tema inicial
    if (typeof window !== "undefined") {
      const localTheme = localStorage.getItem(THEME_STORAGE) as Theme;
      const cookieTheme = Cookies.get(THEME_COOKIE) as Theme;

      const savedTheme = localTheme || cookieTheme;

      console.log("useTheme resolvedTheme init - savedTheme:", savedTheme);

      if (savedTheme === "light") return "light";
      if (savedTheme === "dark") return "dark";
      if (savedTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        console.log("useTheme system theme:", systemTheme);
        return systemTheme;
      }
    }
    return "light";
  });

  // Função para resolver o tema atual
  const resolveTheme = useCallback((currentTheme: Theme): "light" | "dark" => {
    if (currentTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      console.log("useTheme resolving system theme:", systemTheme);
      return systemTheme;
    }
    console.log("useTheme setting resolved theme:", currentTheme);
    return currentTheme;
  }, []);

  // Aplicar tema diretamente no DOM
  const applyThemeToDOM = useCallback((newTheme: "light" | "dark") => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      const body = document.body;

      // Remover classes anteriores
      root.classList.remove("light", "dark");
      body.classList.remove("light", "dark");

      // Aplicar tema atual
      root.classList.add(newTheme);
      body.classList.add(newTheme);

      console.log("useTheme applied to DOM:", newTheme);
      console.log("Root classes:", root.classList.toString());
      console.log("Body classes:", body.classList.toString());
    }
  }, []);

  useEffect(() => {
    console.log("useTheme effect - theme changed to:", theme);

    // Resolver tema baseado na preferência do sistema
    const finalTheme = resolveTheme(theme);
    setResolvedTheme(finalTheme);

    // Aplicar tema imediatamente no DOM
    applyThemeToDOM(finalTheme);

    // Salvar no localStorage e cookie
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_STORAGE, theme);
      Cookies.set(THEME_COOKIE, theme, { expires: THEME_COOKIE_EXPIRES });
      console.log("useTheme saved theme:", theme, "finalTheme:", finalTheme);
    }
  }, [theme, resolveTheme, applyThemeToDOM]);

  useEffect(() => {
    // Escutar mudanças na preferência do sistema
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        const newTheme = mediaQuery.matches ? "dark" : "light";
        console.log("useTheme system preference changed:", newTheme);
        setResolvedTheme(newTheme);
        applyThemeToDOM(newTheme);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, applyThemeToDOM]);

  const changeTheme = useCallback(
    (newTheme: Theme) => {
      console.log(
        "useTheme changeTheme called:",
        newTheme,
        "current theme:",
        theme,
      );
      setTheme(newTheme);
    },
    [theme],
  );

  console.log(
    "useTheme render - theme:",
    theme,
    "resolvedTheme:",
    resolvedTheme,
  );

  return {
    theme,
    resolvedTheme,
    changeTheme,
  };
}
