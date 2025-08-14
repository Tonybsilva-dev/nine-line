"use client";

import { TermsView } from "../view/terms.view";
import { useTranslations } from "next-intl";

export const TermsContainer = () => {
  const t = useTranslations("terms");

  return <TermsView params={{ translations: t }} />;
};
