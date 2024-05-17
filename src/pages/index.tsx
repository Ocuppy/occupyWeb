import type { ReactElement } from "react";

import type { NextPageWithLayout } from "./_app";
import Layout from "@/components/website-layout/Layout";
import DownloadAppSection from "@/components/homePage/DownloadAppSection";
import CheckAppSection from "@/components/homePage/CheckAppSection";
import WhyUs from "@/components/homePage/WhyUs";

const Page: NextPageWithLayout = () => {
  return (
    <div className="bg-[#F9FBFD]">
      <WhyUs />
      <CheckAppSection />
      <DownloadAppSection />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
