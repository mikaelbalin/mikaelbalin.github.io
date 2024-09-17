import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { getUserMeLoader } from "./data/services/get-user-me-loader";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = [...i18n.locales];

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

const protectedRoutes = ["/me"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getUserMeLoader();

  // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  if (
    [
      "/manifest.json",
      "/favicon.ico",
      // Your other files in `public`
    ].includes(pathname)
  ) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Extract locale from pathname if it exists
  const pathnameLocale = i18n.locales.find((locale) =>
    pathname.startsWith(`/${locale}`),
  );

  // Check if the pathname matches any of the protected routes
  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(route) ||
      pathname === `/${pathnameLocale}${route}` ||
      pathname.startsWith(`/${pathnameLocale}${route}`),
  );

  if (isProtectedRoute && user.ok === false) {
    return NextResponse.redirect(new URL(`/signin`, request.url));
  }

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
