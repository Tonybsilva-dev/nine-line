import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "9line Spaces Backoffice",
  description: "Backoffice para gerenciamento do 9line Spaces",
};

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
