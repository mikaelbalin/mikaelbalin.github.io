import { cache } from "react";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Locale } from "@/i18n-config";
import { ThemeProvider } from "@/theme";
import { AdminBar } from "@/components/ui/AdminBar";
import { LivePreviewListener } from "@/components/ui/LivePreviewListener";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getServerSideURL } from "@/utilities/getURL";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import type { FooterSelect, HeaderSelect } from "@/types/payload";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "../global.css";

const getHeader = cache(async () => {
  const payload = await getPayload({ config: configPromise });

  const global = await payload.findGlobal<"header", HeaderSelect>({
    slug: "header",
    depth: 0,
  });

  return global;
});

const getFooter = cache(async () => {
  const payload = await getPayload({ config: configPromise });

  const global = await payload.findGlobal<"footer", FooterSelect>({
    slug: "footer",
    depth: 1,
  });

  return global;
});

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: { lang: Locale };
  }>,
) {
  const params = await props.params;
  const { children } = props;

  const { isEnabled } = await draftMode();
  const header = await getHeader();
  const footer = await getFooter();

  return (
    <html lang={params.lang} className="relative">
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        {/* <ColorSchemeScript defaultColorScheme="auto" /> */}
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
  openGraph: mergeOpenGraph(),
};
