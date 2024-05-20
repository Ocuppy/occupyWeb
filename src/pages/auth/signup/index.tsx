import Signup from "@/components/onboarding/sign-up";
import AuthLayout from "@/components/website-layout/AuthLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement } from "react";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Signup />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Page;
