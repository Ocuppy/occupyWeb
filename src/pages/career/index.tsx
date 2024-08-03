import type { ReactElement } from "react";

import type { NextPageWithLayout } from "./../_app";
import Layout from "@/components/career-layout/Layout";
import DownloadAppSection from "@/components/views/website/DownloadAppSection";
import CheckAppSection from "@/components/views/website/CheckAppSection";
import LetsGrowTogether from "@/components/views/website/LetsGrowTogether";
import MockupSlider from "@/components/views/website/MockupSlider";
import WhyJoinUs from "@/components/views/career/WhyJoinUs";

const Page: NextPageWithLayout = () => {
  return (
    <div className="bg-[#F9FBFD]">
      {/* <MockupSlider /> */}
      {/* <LetsGrowTogether /> */}
      <WhyJoinUs />
      <CheckAppSection />
      <DownloadAppSection />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
