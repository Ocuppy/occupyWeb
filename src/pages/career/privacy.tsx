import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import Layout from "@/components/base-layout/Layout";

const Page: NextPageWithLayout = () => {
  return (
    <section className="mx-auto my-7 w-[85vw] max-w-[94.8125rem]">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-[#242331]">Privacy Policy</h1>
        <p className="text-[#797979]">Effective Date: April 9, 2025</p>
      </header>

      <div className="space-y-6 bg-white p-5 md:p-10 rounded-xl">
        <section>
          <h2 className="text-2xl font-semibold text-[#242331] mb-2">Introduction</h2>
          <p className="text-[#797979]">
            At Occupy, your privacy is important to us. This privacy policy
            explains what information we collect, why we collect it, and how we
            use, disclose, and protect your information when you use our
            services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#242331] mb-2">Information We Collect</h2>
          <ul className="list-disc pl-5 text-[#797979]">
            <li>Personal identification information (Name, email address, phone number)</li>
            <li>Location information (for deliveries and rider tracking)</li>
            <li>Device information (IP address, browser type, etc.)</li>
            <li>Usage data (pages visited, interactions, etc.)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#242331] mb-2">How We Use Your Information</h2>
          <ul className="list-disc pl-5 text-[#797979]">
            <li>To provide and improve our services</li>
            <li>To communicate with you about orders or support requests</li>
            <li>To ensure safety and compliance with legal obligations</li>
            <li>To personalize user experience and conduct analytics</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#242331] mb-2">Children’s Privacy</h2>
          <p className="text-[#797979]">
            Our services are not intended for children under 13. We do not knowingly
            collect personal data from children under 13 without parental consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#242331] mb-2">Data Security</h2>
          <p className="text-[#797979]">
            We implement a variety of security measures to maintain the safety of
            your personal information. However, no method of transmission over the
            Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#242331] mb-2">Your Rights</h2>
          <p className="text-[#797979]">
            You have the right to access, update, or delete your personal
            information at any time. You can contact us to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#242331] mb-2">Contact Us</h2>
          <p className="text-[#797979]">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <ul className="mt-2 text-[#797979]">
            <li>Email: support@occupy.com</li>
            <li>Phone: 09061140728</li>
          </ul>
        </section>
      </div>
    </section>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;