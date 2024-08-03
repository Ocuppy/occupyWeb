import "@/styles/globals.css";
import "@/styles/styles.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Layout from "@/components/dashboard-layout/Layout";
import { Inter, Nunito_Sans } from "next/font/google";
import { DashboardMenuVisibilityProvider } from "@/contexts/DashboardMenuVisibilityContext";
import { NotificationProvider } from "@/contexts/NotificationContext";

export const inter = Inter({ subsets: ["latin"] });
export const nunito = Inter({ subsets: ["latin"], variable: "--font-nunito" });
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <DashboardMenuVisibilityProvider>
        <NotificationProvider>
          <Layout className={`${nunito.variable}`}>{page}</Layout>
        </NotificationProvider>
      </DashboardMenuVisibilityProvider>
    ));

  return getLayout(
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>,
    // <DashboardMenuVisibilityProvider></DashboardMenuVisibilityProvider>,
  );
}
