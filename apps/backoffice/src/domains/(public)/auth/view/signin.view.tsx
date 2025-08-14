import { Apple, Chrome, HelpCircle, Store, User, Shield } from "lucide-react";
import { PageProps } from "@/core/@types/page-params.types";
import Link from "next/link";
import { IconWithBackground } from "@/core/modules/components/custom";
import {
  H1,
  P,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Button,
  Small,
  Input,
} from "@nine-line/ui";

interface SignInViewProps {
  params: PageProps<{
    email: string;
    setEmail: (email: string) => void;
    isLoading: boolean;
    error: string;
    handleSubmit: (e: React.FormEvent) => void;
  }>;
}

export const SignInView: React.FC<SignInViewProps> = ({ params }) => {
  const {
    translations: t,
    email,
    setEmail,
    isLoading,
    error,
    handleSubmit,
  } = params.params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <IconWithBackground
              icon={Store}
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
          <P className="text-muted-foreground">
            {t("signup.text")}{" "}
            <Link
              href="#"
              className="text-primary underline hover:text-primary/80 transition-colors"
            >
              {t("signup.link")}
            </Link>
          </P>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
              >
                {t("email.label")}
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help hover:text-primary transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="max-w-sm p-4 bg-popover border border-border"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <Store className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-sm text-popover-foreground">
                          {t("credentials.title")}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-background rounded-md border border-border">
                          <Shield className="h-3 w-3 text-orange-500" />
                          <div className="flex-1">
                            <div className="text-xs font-medium text-foreground">
                              Administrador
                            </div>
                            <div className="text-xs text-muted-foreground">
                              admin@pedidocerto.com
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-background rounded-md border border-border">
                          <Store className="h-3 w-3 text-blue-500" />
                          <div className="flex-1">
                            <div className="text-xs font-medium text-foreground">
                              Gerente de Mercado
                            </div>
                            <div className="text-xs text-muted-foreground">
                              gerente@pedidocerto.com
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-background rounded-md border border-border">
                          <User className="h-3 w-3 text-green-500" />
                          <div className="flex-1">
                            <div className="text-xs font-medium text-foreground">
                              Usuário
                            </div>
                            <div className="text-xs text-muted-foreground">
                              user@pedidocerto.com
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
                        💡 Use qualquer uma das credenciais acima para testar
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("email.placeholder")}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              required
            />
            {error && <p className="text-destructive text-sm mt-1">{error}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-muted text-foreground hover:bg-muted/80"
            disabled={isLoading}
          >
            {isLoading ? t("login.loading") : t("login.button")}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">
              {t("divider")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="bg-background border-border text-foreground hover:bg-muted"
          >
            <Apple className="w-4 h-4 mr-2" />
            {t("social.apple")}
          </Button>
          <Button
            variant="outline"
            className="bg-background border-border text-foreground hover:bg-muted"
          >
            <Chrome className="w-4 h-4 mr-2" />
            {t("social.google")}
          </Button>
        </div>

        <div className="text-center">
          <Small className="text-muted-foreground">
            {t("terms.text")}{" "}
            <Link
              href="/terms"
              className="text-primary underline hover:text-primary/80 transition-colors"
            >
              {t("terms.terms")}
            </Link>{" "}
            {t("terms.and")}{" "}
            <Link
              href="/terms"
              className="text-primary underline hover:text-primary/80 transition-colors"
            >
              {t("terms.privacy")}
            </Link>
          </Small>
        </div>
      </div>
    </div>
  );
};
