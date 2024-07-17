import type { ReactElement } from "react";

import type { NextPageWithLayout } from "./_app";
import Layout from "@/components/website-layout/Layout";
import DownloadAppSection from "@/components/views/website/DownloadAppSection";
import CheckAppSection from "@/components/views/website/CheckAppSection";
import WhyUs from "@/components/views/website/WhyUs";
import LetsGrowTogether from "@/components/views/website/LetsGrowTogether";
import MockupSlider from "@/components/views/website/MockupSlider";

const Page: NextPageWithLayout = () => {
  return (
    <div className="bg-[#F9FBFD]">
      <MockupSlider />
      <LetsGrowTogether />
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
