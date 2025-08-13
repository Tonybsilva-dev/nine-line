import dynamic from "next/dynamic";
const LanguageSwitcher = dynamic(() =>
  import("@/core/modules/components/custom/language-switcher.component").then(
    (mod) => mod.LanguageSwitcher,
  ),
);
import { BackButton } from "@/core/modules/components/custom/back-button.component";
import { LAST_UPDATED_APPLICATION } from "@/core/modules/constants/app.constants";
import { useIsMobile } from "@/core/modules/hooks/use.mobile.hook";
import { PageProps } from "@/core/@types/page-params.types";
import { H1, Small, H4, P } from "@nine-line/ui";

export const TermsView: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;
  const isMobile = useIsMobile();

  return (
    <main
      className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 md:px-8 md:py-24"
      aria-labelledby="terms-heading"
      role="main"
      suppressHydrationWarning
    >
      <div className="mb-6 flex w-full items-center justify-between">
        <BackButton />
        <div className="min-w-35">
          <LanguageSwitcher compact={isMobile} />
        </div>
      </div>
      <div className="space-y-8">
        <header className="flex flex-col items-center justify-center">
          <H1
            id="terms-heading"
            className="text-center sm:text-4xl md:text-5xl"
          >
            {t("title")}
          </H1>
          <Small className="mt-2 text-center text-zinc-500">
            {t("lastUpdated")}: {LAST_UPDATED_APPLICATION}
          </Small>
        </header>
        <div className="space-y-6">
          <section
            aria-labelledby="user-responsibilities"
            suppressHydrationWarning
          >
            <H4 id="user-responsibilities">
              {t("sections.userResponsibilities.title")}
            </H4>
            <P className="text-muted-foreground">
              {t("sections.userResponsibilities.content")}
            </P>
          </section>
          <section aria-labelledby="data-privacy" suppressHydrationWarning>
            <H4 id="data-privacy">{t("sections.dataPrivacy.title")}</H4>
            <P className="text-muted-foreground">
              {t("sections.dataPrivacy.content")}
            </P>
          </section>
          <section
            aria-labelledby="intellectual-property"
            suppressHydrationWarning
          >
            <H4 id="intellectual-property">
              {t("sections.intellectualProperty.title")}
            </H4>
            <P className="text-muted-foreground">
              {t("sections.intellectualProperty.content")}
            </P>
          </section>
          <section
            aria-labelledby="liability-limitations"
            suppressHydrationWarning
          >
            <H4 id="liability-limitations">
              {t("sections.limitationOfLiability.title")}
            </H4>
            <P className="text-muted-foreground">
              {t("sections.limitationOfLiability.content")}
            </P>
          </section>
          <section aria-labelledby="terms-changes" suppressHydrationWarning>
            <H4 id="terms-changes">{t("sections.changesToTerms.title")}</H4>
            <P className="text-muted-foreground">
              {t("sections.changesToTerms.content")}
            </P>
          </section>
          <section aria-labelledby="contact-us" suppressHydrationWarning>
            <H4 id="contact-us">{t("sections.contactUs.title")}</H4>
            <P className="text-muted-foreground">
              {t("sections.contactUs.content")}
            </P>
          </section>
        </div>
      </div>
    </main>
  );
};
