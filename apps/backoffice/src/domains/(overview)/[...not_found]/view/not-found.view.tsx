"use client";

import Image from "next/image";

import NOT_FOUND_IMAGE from "@/assets/images/not-found.svg";
import { BackButton } from "@/core/modules/components/custom/back-button.component";
import { H3, P } from "@nine-line/ui";
import { PageProps } from "@/core/@types/page-params.types";

export const NotFoundCatchAll: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;

  return (
    <div
      className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8"
      role="alert"
      aria-live="assertive"
      aria-labelledby="not-found-title"
      aria-describedby="not-found-description"
    >
      <div className="relative mx-auto mb-6 block w-full max-w-md px-4 sm:px-6 md:hidden lg:px-8">
        <BackButton className="absolute -top-8 left-0 sm:-top-10 sm:left-0" />
      </div>
      <Image
        src={NOT_FOUND_IMAGE}
        width={300}
        height={300}
        alt={t("alt")}
        className="h-auto max-w-full"
      />
      <div className="mx-auto max-w-md text-center">
        <H3 className="text-center">{t("title")}</H3>
        <P id="not-found-description" className="mt-4 text-center">
          {t("description")}
        </P>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <div className="hidden md:block">
            <BackButton className="w-full sm:w-10" />
          </div>
        </div>
      </div>
    </div>
  );
};
