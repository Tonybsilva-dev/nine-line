interface ErrorInfo {
  componentStack: string;
}

interface ErrorLogData {
  error: Error;
  errorInfo?: ErrorInfo;
  userAgent?: string;
  url?: string;
  timestamp: string;
  environment: string;
}

class ErrorLogger {
  private static instance: ErrorLogger;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  init() {
    if (this.isInitialized) return;

    if (typeof window !== "undefined") {
      window.addEventListener("error", (event) => {
        this.logError(event.error, {
          componentStack: event.filename || "Unknown",
        });
      });

      window.addEventListener("unhandledrejection", (event) => {
        this.logError(new Error(event.reason), {
          componentStack: "Unhandled Promise Rejection",
        });
      });
    }

    this.isInitialized = true;
  }

  logError(error: Error, errorInfo?: ErrorInfo) {
    const errorData: ErrorLogData = {
      error,
      errorInfo,
      userAgent:
        typeof window !== "undefined" ? window.navigator.userAgent : undefined,
      url: typeof window !== "undefined" ? window.location.href : undefined,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    };

    if (process.env.NODE_ENV === "development") {
      console.group("🚨 Error Logger");
      console.error("Error:", error);
      console.error("Error Info:", errorInfo);
      console.error("Error Data:", errorData);
      console.groupEnd();
    }

    this.sendToMonitoringService(errorData);
  }

  private async sendToMonitoringService(errorData: ErrorLogData) {
    try {
      if (process.env.NODE_ENV === "production") {
        console.error("Production Error:", errorData);
      }
    } catch (loggingError) {
      console.error(
        "Failed to send error to monitoring service:",
        loggingError,
      );
    }
  }
}

export const errorLogger = ErrorLogger.getInstance();

export function useErrorLogger() {
  const logError = (error: Error, errorInfo?: ErrorInfo) => {
    errorLogger.logError(error, errorInfo);
  };

  return { logError };
}

export function withErrorLogging<T extends (...args: unknown[]) => unknown>(
  fn: T,
  context?: string,
): T {
  return ((...args: Parameters<T>) => {
    try {
      const result = fn(...args);

      if (result && typeof result === "object" && "then" in result) {
        return (result as Promise<unknown>).catch((error: Error) => {
          errorLogger.logError(error, {
            componentStack: context || "Async Function",
          });
          throw error;
        });
      }

      return result;
    } catch (error) {
      errorLogger.logError(error as Error, {
        componentStack: context || "Function",
      });
      throw error;
    }
  }) as T;
}
