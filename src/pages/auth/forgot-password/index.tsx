import ForgotPassword from "@/components/onboarding/forgot-password";
import AuthLayout from "@/components/website-layout/AuthLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement } from "react";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <ForgotPassword />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Page;
