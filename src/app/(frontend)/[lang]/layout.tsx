import { draftMode } from "next/headers";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/theme";
import { AdminBar } from "@/components/ui/AdminBar";
import { LivePreviewListener } from "@/components/ui/LivePreviewListener";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Notifications } from "@mantine/notifications";
import { ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./global.css";
import { Metadata } from "next";
import { getServerSideURL } from "@/utilities/getURL";
import { LocaleParams } from "@/i18n-config";
import { PageService } from "@/lib/services/PageService";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<LocaleParams>;
  }>,
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
        <ColorSchemeScript defaultColorScheme="auto" />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
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
          <div className="relative flex flex-col min-h-screen">
            <Header {...header} />
            <main className="flex-1">{children}</main>
            <Footer {...footer} />
          </div>
          <Notifications position="bottom-center" />
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
