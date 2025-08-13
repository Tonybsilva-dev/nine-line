"use client";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const HomeView = dynamic(() =>
  import("../view/home.view").then((mod) => mod.HomeView),
);

export const HomeContainer = () => {
  const t = useTranslations("home");

  return <HomeView params={{ translations: t }} />;
};
