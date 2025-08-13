"use client";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const LoadingView = dynamic(() =>
  import("../view/loading.view").then((mod) => mod.LoadingView),
);

export const LoadingContainer = () => {
  const t = useTranslations("loading");

  return <LoadingView params={{ translations: t }} />;
};
