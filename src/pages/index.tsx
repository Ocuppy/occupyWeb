import type { ReactElement } from "react";

import type { NextPageWithLayout } from "./_app";
import Layout from "@/components/website-layout/Layout";

const Page: NextPageWithLayout = () => {
  return <p>hello world homepage</p>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
