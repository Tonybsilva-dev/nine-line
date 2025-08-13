"use client";

import React from "react";
import { errorLogger } from "../utils/error-logger.utils";

export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const handleError = React.useCallback((error: Error) => {
    console.error("Error caught by useErrorHandler:", error);
    errorLogger.logError(error, {
      componentStack: "useErrorHandler Hook",
    });
    setError(error);
  }, []);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, resetError };
}
