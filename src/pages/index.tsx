import type { ReactElement } from "react";

import type { NextPageWithLayout } from "./_app";
import Layout from "@/components/website-layout/Layout";
import LetsGrowTogether from "@/components/views/website/LetsGrowTogether";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <LetsGrowTogether />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
