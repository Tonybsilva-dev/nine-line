import { Button } from "@nine-line/ui";
import { H1, P } from "@nine-line/ui";
import { IconWithBackground } from "@/core/modules/components/custom";
import { AlertTriangle } from "lucide-react";
import { PageProps } from "@/core/@types/page-params.types";

interface AuthErrorViewProps {
  params: PageProps<{
    errorMessage: string;
  }>;
}

export const AuthErrorView: React.FC<AuthErrorViewProps> = ({ params }) => {
  const { translations: t, errorMessage } = params.params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <IconWithBackground
              icon={AlertTriangle}
              variant="danger"
              size="lg"
              className="w-16 h-16"
            />
          </div>
          <div className="space-y-2">
            <H1 className="text-foreground text-2xl font-bold">{t("title")}</H1>
          </div>
        </div>

        <div className="text-center">
          <P className="text-muted-foreground mb-6">{errorMessage}</P>
        </div>

        <Button
          onClick={() => window.history.back()}
          className="w-full bg-muted text-foreground hover:bg-muted/80"
        >
          {t("backButton")}
        </Button>
      </div>
    </div>
  );
};
