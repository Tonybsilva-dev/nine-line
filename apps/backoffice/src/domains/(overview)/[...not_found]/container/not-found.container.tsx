"use client";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const NotFoundCatchAll = dynamic(() =>
  import("../view/not-found.view").then((mod) => mod.NotFoundCatchAll),
);

export const NotFoundContainer = () => {
  const t = useTranslations("not-found");

  return <NotFoundCatchAll params={{ translations: t }} />;
};
