import "@/styles/globals.css";
import "@/styles/styles.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Layout from "@/components/dashboard-layout/Layout";
import { DashboardMenuVisibilityProvider } from "@/contexts/DashboardMenuVisibilityContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import Providers from "@/store/redux/Provider";
import { Toaster } from "@/components/ui/toaster";
import { OrderNotificationProvider } from "@/contexts/OrderNotificationContext";
import { Nunito } from "next/font/google";

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
          <OrderNotificationProvider>
            <Layout className={`font-inter`}>{page}</Layout>
          </OrderNotificationProvider>
        </NotificationProvider>
      </DashboardMenuVisibilityProvider>
    ));

  return (
    <Providers>
      {getLayout(
        <>
          <style jsx global>{`
            html {
              font-family: "Inter", sans-serif;
            }
          `}</style>
          <Toaster />
          <Component {...pageProps} />
        </>,
      )}
    </Providers>
  );
}

// <DashboardMenuVisibilityProvider></DashboardMenuVisibilityProvider>,
