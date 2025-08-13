import { NextRequest, NextResponse } from "next/server";
import { routing } from "./locales/routing.locale";
import { cookies } from "next/headers";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  ...routing,
});

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Verificar se já tem locale na URL
  const pathnameHasLocale = ["pt", "en", "es"].some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathname === "/") {
    const cookieStore = await cookies();
    const localeFromCookies = cookieStore.get("NEXT_LOCALE");
    const locale = localeFromCookies?.value || "pt";
    return NextResponse.redirect(new URL(`/${locale}`, req.nextUrl.origin));
  }

  // Se não tem locale na URL, redirecionar para o locale padrão
  if (!pathnameHasLocale && pathname !== "/") {
    const cookieStore = await cookies();
    const localeFromCookies = cookieStore.get("NEXT_LOCALE");
    const locale = localeFromCookies?.value || "pt";
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, req.nextUrl.origin),
    );
  }

  return intlMiddleware(req) || NextResponse.next();
}

// Configuração do matcher
export const config = {
  matcher: [
    "/", // Página inicial
    "/(pt|en|es)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
