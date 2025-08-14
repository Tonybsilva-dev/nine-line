"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { PageProps } from "@/core/@types/page-params.types";

const SignInView = dynamic(() =>
  import("../view/signin.view").then((mod) => mod.SignInView),
);

export const SignInContainer = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const locale = (params?.lang as string) || "pt";
  const t = useTranslations("auth.signin");

  useEffect(() => {
    if (session) {
      if (session.user?.role === "backoffice") {
        router.push(`/${locale}/backoffice`);
      } else if (session.user?.role === "manager") {
        router.push(`/${locale}/manager`);
      } else {
        router.push(`/${locale}`);
      }
    }
  }, [session, router, locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const password =
        email === "admin@pedidocerto.com" ? "admin123" : "gerente123";

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(t("error.invalid"));
      } else {
        if (email === "admin@pedidocerto.com") {
          router.push(`/${locale}/backoffice`);
        } else if (email === "gerente@pedidocerto.com") {
          router.push(`/${locale}/manager`);
        } else {
          router.push(`/${locale}`);
        }
      }
    } catch {
      setError(t("error.general"));
    } finally {
      setIsLoading(false);
    }
  };

  const pageProps: PageProps<{
    email: string;
    setEmail: (email: string) => void;
    isLoading: boolean;
    error: string;
    handleSubmit: (e: React.FormEvent) => void;
  }> = {
    params: {
      translations: t,
      email,
      setEmail,
      isLoading,
      error,
      handleSubmit,
    },
  };

  return <SignInView params={pageProps} />;
};
