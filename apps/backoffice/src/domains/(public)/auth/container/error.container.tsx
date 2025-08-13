"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { PageProps } from "@/core/@types/page-params.types";
const AuthErrorView = dynamic(() =>
  import("../view/error.view").then((mod) => mod.AuthErrorView),
);

export const AuthErrorContainer = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const t = useTranslations("auth.error");

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "CredentialsSignin":
        return t("credentials");
      case "AccessDenied":
        return t("accessDenied");
      case "Verification":
        return t("verification");
      default:
        return t("general");
    }
  };

  const pageProps: PageProps<{
    errorMessage: string;
  }> = {
    params: {
      translations: t,
      errorMessage: getErrorMessage(error),
    },
    searchParams: {
      error: error || undefined,
    },
  };

  return <AuthErrorView params={pageProps} />;
};
