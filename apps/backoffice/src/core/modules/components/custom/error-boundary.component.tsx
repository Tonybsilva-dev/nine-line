"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { errorLogger } from "../../utils/error-logger.utils";
import { useErrorHandler } from "../../hooks/use-error-handler.hook";
import { H2, P, Button } from "@nine-line/ui";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });

    errorLogger.logError(error, {
      componentStack: errorInfo.componentStack || "Unknown Component",
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
  onReset?: () => void;
}

function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  const router = useRouter();
  const t = useTranslations("components.error-boundary");

  const handleRetry = () => {
    if (onReset) {
      onReset();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <AlertTriangle className="h-12 w-12 text-red-500" />
      </div>

      <H2 className="mb-2 text-gray-900 dark:text-white">{t("title")}</H2>

      <P className="mb-6 text-gray-600 dark:text-gray-300">
        {t("description")}
      </P>

      {error && process.env.NODE_ENV === "development" && (
        <details className="mb-4 text-left">
          <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 mb-2">
            {t("details-title")}
          </summary>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-auto max-h-32">
            {error.message}
            {error.stack}
          </pre>
        </details>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          onClick={handleRetry}
          variant="default"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          {t("retry-button")}
        </Button>

        <Button
          onClick={handleGoHome}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          {t("home-button")}
        </Button>
      </div>
    </div>
  );
}

interface ErrorCatcherProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ErrorCatcher({ children, fallback }: ErrorCatcherProps) {
  const { error, handleError, resetError } = useErrorHandler();

  React.useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      handleError(new Error(event.reason));
    };

    const handleErrorEvent = (event: ErrorEvent) => {
      handleError(new Error(event.message));
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleErrorEvent);

    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
      window.removeEventListener("error", handleErrorEvent);
    };
  }, [handleError]);

  if (error) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return <ErrorFallback error={error} onReset={resetError} />;
  }

  return <>{children}</>;
}
