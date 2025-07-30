import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nine Line Backoffice",
  description: "Backoffice para gerenciamento do Nine Line",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
