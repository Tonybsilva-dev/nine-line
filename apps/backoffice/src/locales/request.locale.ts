import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing.locale";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "pt" | "en" | "es")) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
