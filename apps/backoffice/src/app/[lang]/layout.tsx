import "../globals.css";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider, ThemeProvider } from "@/core/modules/providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { metadataConfig } from "@/core/config/seo-meta.config";
import { ErrorBoundary } from "@/core/modules/components/custom";
import { errorLogger } from "@/core/modules/utils/error-logger.utils";

export const metadata: Metadata = metadataConfig;

if (typeof window !== "undefined") {
  errorLogger.init();
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const messages = await getMessages();

  return (
    <html lang={lang}>
      <body className={`antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ErrorBoundary>
            <ThemeProvider>
              <AuthProvider>
                <main suppressHydrationWarning>
                  {children}
                  <Analytics />
                </main>
              </AuthProvider>
            </ThemeProvider>
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
