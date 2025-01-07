import { ThemeProvider } from "@/theme";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ColorSchemeScript } from "@mantine/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "../global.css";
import { Notifications } from "@mantine/notifications";
import { Locale } from "../../../../i18n-config";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AdminBar } from "@/components/ui/AdminBar";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { draftMode } from "next/headers";
import { getServerSideURL } from "@/utilities/getURL";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { getCachedFooter, getCachedHeader } from "@/utilities/getGlobals";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout(
  props: Readonly<
    {
      children: React.ReactNode;
    } & {
      params: { lang: Locale };
    }
  >,
) {
  const params = await props.params;

  const { children } = props;

  const { isEnabled } = await draftMode();
  const header = await getCachedHeader()();
  const footer = await getCachedFooter()();

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
  title: "Mikael Balin",
  description:
    "Full-stack developer crafting elegant solutions through clean code and thoughtful design. Explore my projects, technical articles, and insights into modern web development.",
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: "summary_large_image",
    creator: "@payloadcms",
  },
};
