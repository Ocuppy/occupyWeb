import type { ReactElement } from "react";

import type { NextPageWithLayout } from "./../_app";
import Layout from "@/components/base-layout/Layout";

const Page: NextPageWithLayout = () => {
  return (
    <section className="mx-auto my-7 w-[85vw] max-w-[94.8125rem]">
      <header className="mx-auto mb-4 flex w-full flex-col items-center justify-between gap-y-4 bg-[#F8F8F8] p-5 md:flex-row">
        <div className="flex w-4/5 items-center">
          <p className="w-1/2 text-left text-lg">Occupy Rider</p>
          <div className="flex w-1/2 items-center gap-2">
            <svg
              width="23"
              height="29"
              viewBox="0 0 23 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3496 0.260254C8.4333 0.263694 5.6374 1.42372 3.57525 3.48588C1.51309 5.54803 0.353062 8.34393 0.349621 11.2603C0.346128 13.6435 1.1246 15.962 2.56562 17.8603C2.56562 17.8603 2.86562 18.2553 2.91462 18.3123L11.3496 28.2603L19.7886 18.3073C19.8326 18.2543 20.1336 17.8603 20.1336 17.8603L20.1346 17.8573C21.5749 15.9599 22.353 13.6424 22.3496 11.2603C22.3462 8.34393 21.1861 5.54803 19.124 3.48588C17.0618 1.42372 14.2659 0.263694 11.3496 0.260254ZM11.3496 15.2603C10.5585 15.2603 9.78514 15.0257 9.12734 14.5861C8.46954 14.1466 7.95685 13.5219 7.6541 12.791C7.35135 12.0601 7.27214 11.2558 7.42648 10.4799C7.58082 9.70397 7.96178 8.99124 8.52119 8.43183C9.0806 7.87242 9.79334 7.49145 10.5693 7.33711C11.3452 7.18277 12.1494 7.26198 12.8804 7.56474C13.6113 7.86749 14.236 8.38018 14.6755 9.03797C15.115 9.69577 15.3496 10.4691 15.3496 11.2603C15.3483 12.3207 14.9264 13.3374 14.1766 14.0872C13.4267 14.8371 12.4101 15.2589 11.3496 15.2603Z"
                fill="#212330"
              />
            </svg>
            <p>Full Time | Remote</p>
          </div>
        </div>
        <div className="">
          <button className="rounded-lg border border-black px-5 py-2 text-black">
            DETAILS
          </button>
        </div>
      </header>
      <section className="bg-white p-2 lg:p-10">
        <div className="rounded-xl bg-[#F9FBFD] px-10 py-7 md:rounded-3xl md:px-28">
          <header className="mb-8 w-full space-y-4 text-center">
            <h4 className="font-serif text-4xl text-[#242331] lg:text-5xl">
              Occupy Rider
            </h4>
            <h5 className="text-xl">
              Abuja, Nigeria |
              <span className="text-occupy-primary"> Full Time | Remote</span>
            </h5>
          </header>
          <section className="space-y-9">
            <div className="space-y-5">
              <header className="mb-3 flex w-full flex-col items-start justify-between overflow-visible lg:flex-row lg:items-center">
                <h4 className="font-serif text-2xl text-[#242331] lg:text-5xl">
                  About the Role
                </h4>
                <div className="flex items-center gap-2">
                  <h5 className="text-xl font-semibold">Posted </h5>
                  <h5 className="text-xl">25 November, 2023</h5>
                </div>
              </header>
              <p className="text-justify text-[#797979]">
                you are going to use a passage of Lorem Ipsum, you need to be
                sure there isn&apos;t embarrassing hidden in the middle of text.
                All the Lorem Ipsum generators on the Internet tend to repeat
                predefined chunks as necessary, making this the first true
                generator on the Internet.
              </p>
              <ul className="list-disc space-y-3">
                <li>
                  You are going to use a passage of Lorem Ipsum, you need to be
                </li>
                <li>
                  Sure there isn&apos;t embarrassing hidden in the middle of
                  text. All the
                </li>
                <li>
                  Sure there isn&apos;t embarrassing hidden in the middle of
                  text. All the
                </li>
                <li>
                  Sure there isn&apos;t embarrassing hidden in the middle of
                  text. All the
                </li>
              </ul>
            </div>
            <div>
              <header className="mb-3 w-full overflow-visible">
                <h4 className="font-serif text-2xl text-[#242331] lg:text-5xl">
                  If the feeling is mutual, we offer:
                </h4>
              </header>
              <p className="text-justify text-[#797979]">
                you are going to use a passage of Lorem Ipsum, you need to be
                sure there isn&apos;t embarrassing hidden in the middle of text.
                All the Lorem Ipsum generators on the Internet tend to repeat
                predefined chunks as necessary, making this the first true
                generator on the Internet.
              </p>
              <ul className="list-disc space-y-3">
                <li>
                  You are going to use a passage of Lorem Ipsum, you need to be
                </li>
                <li>
                  Sure there isn&apos;t embarrassing hidden in the middle of
                  text. All the
                </li>
                <li>
                  Sure there isn&apos;t embarrassing hidden in the middle of
                  text. All the
                </li>
                <li>
                  Sure there isn&apos;t embarrassing hidden in the middle of
                  text. All the
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <header className="w-full overflow-visible">
                <h4 className="font-serif text-2xl text-[#242331] lg:text-5xl">
                  Contact Us!
                </h4>
              </header>
              <p className="text-[#797979]">
                Reach out to discuss the opportunity & send your answers to:
              </p>
              <div className="space-y-1">
                <p className="font-semibold">John Peeter</p>
                <p className="text-[#797979]">support@occupy.com</p>
                <p className="text-[#797979]">09061140728</p>
              </div>
              <button className="rounded-lg bg-occupy-primary px-5 py-2 text-white">
                APPLY NOW
              </button>
            </div>
          </section>
        </div>
      </section>
    </section>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
