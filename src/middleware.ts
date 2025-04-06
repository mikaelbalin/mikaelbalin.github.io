import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "#i18n-config";
import { getLocale } from "#lib/getLocale";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    // Redirect if there is no locale
    const locale = getLocale(request.headers);

    request.nextUrl.pathname = `/${locale}${pathname}`;
    request.nextUrl.search = search;

    return NextResponse.redirect(request.nextUrl);
  }
}

export const config = {
  matcher: [
    "/((?!_next|api|admin|sitemap|robots|favicon|media|fonts|apple-touch-icon|icon).*)",
  ],
};
