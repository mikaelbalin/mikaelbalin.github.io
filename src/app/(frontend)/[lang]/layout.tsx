import { Footer } from "#components/Footer";
import { Header } from "#components/Header";
import { ThemeProvider } from "#components/theme-provider";
import { AdminBar } from "#components/ui/AdminBar";
import { LivePreviewListener } from "#components/ui/LivePreviewListener";
import { Toaster } from "#components/ui/Toaster";
import { LocaleParams } from "#i18n-config";
import { getServerSideURL } from "#lib/getURL";
import { PageService } from "#lib/services/PageService";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { Metadata } from "next/types";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Force static generation for layout at build time
export const dynamic = "force-static";
// Revalidate header/footer data every 24 hours
export const revalidate = 86400;

export default async function RootLayout(
  props: Readonly<{ children: React.ReactNode; params: Promise<LocaleParams> }>,
) {
  const { children } = props;
  const { lang } = await props.params;

  const { isEnabled } = await draftMode();
  const [header, footer] = await Promise.all([
    PageService.getHeader(lang),
    PageService.getFooter(lang),
  ]);

  return (
    <html lang={lang} className="relative" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <LivePreviewListener />
          <main>
            <div className="relative flex min-h-screen flex-col">
              <Header {...header} />
              <main className="flex-1">{children}</main>
              <Footer {...footer} />
            </div>
          </main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
};
