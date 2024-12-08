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
import { getGlobalPageData } from "@/data/loaders";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mikael Balin",
  description:
    "Full-stack developer crafting elegant solutions through clean code and thoughtful design. Explore my projects, technical articles, and insights into modern web development.",
};

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

  const globalData = await getGlobalPageData();
  const user = await getUserMeLoader();

  return (
    <html lang={params.lang} className="relative">
      <head>{/* <ColorSchemeScript defaultColorScheme="auto" /> */}</head>
      <body className={inter.className}>
        <ThemeProvider>
          {globalData && (
            <div className="relative flex flex-col min-h-screen">
              <Header {...globalData.header} user={user} />
              <main className="flex-1">{children}</main>
              <Footer {...globalData.footer} />
            </div>
          )}
          <Notifications position="bottom-center" />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
