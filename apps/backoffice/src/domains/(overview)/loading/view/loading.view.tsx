import { PageProps } from "@/core/@types/page-params.types";

export const LoadingView: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground text-lg">{t("title")}</p>
        <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
      </div>
    </div>
  );
};
