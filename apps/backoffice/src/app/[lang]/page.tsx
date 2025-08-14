import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export { HomeContainer as default } from "@/domains/(public)/home/container/home.container";
