"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import locales from "@/assets/icons/locales";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  Typography,
} from "@nine-line/ui";

const supportedLocales = ["en", "pt", "es"] as const;
type Locale = (typeof supportedLocales)[number];

type LanguageSwitcherProps = {
  compact?: boolean;
};

export function LanguageSwitcher({ compact }: LanguageSwitcherProps) {
  const [currentLocale, setCurrentLocale] = useState<Locale>("en");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("components.language-switcher");

  useEffect(() => {
    const savedLocale = Cookies.get("NEXT_LOCALE") as Locale;
    if (savedLocale && supportedLocales.includes(savedLocale)) {
      setCurrentLocale(savedLocale);
    }
  }, []);

  const changeLanguage = (locale: Locale) => {
    setCurrentLocale(locale);
    Cookies.set("NEXT_LOCALE", locale, { expires: 365 });

    // Extrair o caminho sem o locale atual
    const pathSegments = pathname.split("/");
    const currentLocaleInPath = pathSegments[1];

    // Se o primeiro segmento é um locale válido, remova-o
    let pathWithoutLocale = pathname;
    if (supportedLocales.includes(currentLocaleInPath as Locale)) {
      pathWithoutLocale = "/" + pathSegments.slice(2).join("/");
    }

    // Construir a nova URL
    const newPath = `/${locale}${pathWithoutLocale}`;
    const params = new URLSearchParams(searchParams as ReadonlyURLSearchParams);
    const finalUrl = params.toString()
      ? `${newPath}?${params.toString()}`
      : newPath;

    console.log("Changing language to:", locale);
    console.log("Current pathname:", pathname);
    console.log("New path:", finalUrl);

    router.push(finalUrl);
  };

  const renderFlag = (locale: Locale) => {
    return (
      <Image
        src={locales[locale]}
        alt={locale}
        width={24}
        height={24}
        className="rounded-full"
        loading="lazy"
      />
    );
  };

  return (
    <div role="group" aria-labelledby="language-switcher-label">
      <span id="language-switcher-label" className="sr-only">
        {t("sr-only.aria-label.select")}
      </span>
      <Select
        value={currentLocale}
        onValueChange={(value: string) => changeLanguage(value as Locale)}
        aria-label={t("sr-only.aria-label.select")}
      >
        <SelectTrigger className="items-center justify-between">
          <SelectValue>
            {compact ? (
              renderFlag(currentLocale)
            ) : (
              <div className="flex items-center gap-2">
                {renderFlag(currentLocale)}
                {t(`options.${currentLocale}`)}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {!compact && (
              <SelectLabel className="self-center">{t("label")}</SelectLabel>
            )}
            {supportedLocales.map((locale) => (
              <SelectItem key={locale} value={locale}>
                {compact ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex-shrink-0">{renderFlag(locale)}</div>
                    <Typography variant={"body2"}>
                      {locale.toUpperCase()}
                    </Typography>
                  </div>
                ) : (
                  <div className="flex gap-2 px-4">
                    <div className="flex-shrink-0">{renderFlag(locale)}</div>
                    <Typography variant={"body2"}>
                      {t(`options.${locale}`)}
                    </Typography>
                  </div>
                )}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div role="status" aria-live="polite" className="sr-only">
        {t(`sr-only.announcements.changed-to`, { locale: currentLocale })}
      </div>
    </div>
  );
}
