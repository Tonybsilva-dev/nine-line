import React from "react";
import { PageProps } from "@/core/@types/page-params.types";
import { H1, P } from "@nine-line/ui";

interface BackofficeViewProps extends PageProps {
  user?: unknown;
}

export const BackofficeView: React.FC<BackofficeViewProps> = () => {
  return (
    <div>
      <div className="mb-6">
        <H1 className="text-card-foreground mb-2">Dashboard Backoffice</H1>
        <P className="text-muted-foreground">
          Painel administrativo - em desenvolvimento
        </P>
      </div>
    </div>
  );
};
