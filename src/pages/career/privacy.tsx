import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import Layout from "@/components/base-layout/Layout";

const Page: NextPageWithLayout = () => {
  return (
    <section className="mx-auto my-7 w-[85vw] max-w-[94.8125rem]">
      <header className="mb-6 text-balance">
        <h1 className="text-4xl font-bold text-[#242331]">Privacy Policy</h1>
        <p className="text-[#797979]">Effective Date: April 10, 2025</p>
      </header>

      <div className="space-y-6 bg-white p-5 md:p-10 rounded-xl">
        <section>
          <h2 className="text-2xl font-semibold text-[#242331] mb-2">Introduction</h2>
          <p className="text-[#797979]">
            At Occupy, your privacy is important to us. This Privacy Policy
            explains how we collect, use, and protect your information when
            you use our estate-centric e-commerce and delivery platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#242331] mb-2">Information We Collect</h2>
          <ul className="list-disc pl-5 text-[#797979]">
            <li>Name</li>
            <li>Phone number</li>
            <li>Email address</li>
            <li>Delivery address</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#242331] mb-2">How We Use Your Information</h2>
          <ul className="list-disc pl-5 text-[#797979]">
            <li>To process and deliver your orders</li>
            <li>To communicate with you about your orders and updates</li>
            <li>To improve our services and user experience within estates</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#242331] mb-2">Sharing of Information</h2>
          <p className="text-[#797979]">
            We do not sell or rent your personal data. We only share information when necessary, including:
          </p>
          <ul className="list-disc pl-5 text-[#797979] mt-2">
            <li>With vendors and delivery personnel to fulfill your orders</li>
            <li>When required by law or to protect the rights and safety of Occupy or its users</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#242331] mb-2">Data Security</h2>
          <p className="text-[#797979]">
            We take reasonable measures to protect your personal information.
            Your data is stored securely and only accessed by authorized personnel for order fulfillment purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#242331] mb-2">Your Rights</h2>
          <p className="text-[#797979]">
            You have the right to access, update, or delete your personal
            information. You can contact our support team to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#242331] mb-2">Cookies and Tracking</h2>
          <p className="text-[#797979]">
            We may use basic cookies to help the platform function properly.
            These are not used for tracking or analytics and are limited to improving your experience on the site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#242331] mb-2">Children’s Privacy</h2>
          <p className="text-[#797979]">
            Occupy is not intended for children under the age of 13. We do not knowingly collect data from minors.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#242331] mb-2">Changes to This Policy</h2>
          <p className="text-[#797979]">
            We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated effective date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#242331] mb-2">Account Deletion</h2>
          <p className="text-[#797979]">
            If you wish to delete your Occupy account, you can do so by contacting our support team at 
            <a href="mailto:support@occupy.com" className="text-blue-600 underline ml-1">admin@occupymart.com </a> 
            with the subject line “Account Deletion Request”. We will process your request within 48 hours.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#242331] mb-2">Contact Us</h2>
          <p className="text-[#797979]">
            If you have any questions or concerns about this Privacy Policy, please contact us:
          </p>
          <ul className="mt-2 text-[#797979]">
            <li>Email: admin@occupymart.com</li>
            <li>Phone: +2349061140728</li>
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
