import Image from "next/image";
import Container from "../../shared/Container";

import React from "react";
import Router from "next/router";
import { title } from "process";

const WhyJoinUsCard = (props: {
  title: string;
  description: string;
  iconURL: string;
}) => {
  return (
    <div className="flex w-fit items-center gap-6">
      <div className="grid size-[56px] place-items-center rounded-lg bg-occupy-primary">
        <Image
          alt={`${props.description} icon`}
          src={`${props.iconURL}`}
          width={24}
          height={24}
        />
      </div>
      <section className="w-3/4">
        <h6 className="text-2xl">{props.title}</h6>
        <p className="text-lg">{props.description}</p>
      </section>
    </div>
  );
};

const WhyJoinUsData: {
  title: string;
  description: string;
  iconURL: string;
}[] = [
  {
    title: "Fast Growing Company",
    description: "We are at an inflection point to achieve accelerated growth",
    iconURL: "/icons/file.svg",
  },
  {
    title: "Great Colleagues",
    description: "Closely tied and supportive team",
    iconURL: "/icons/search.svg",
  },
  {
    title: "Take Charge",
    description: "As much as you are willing to take and show excellence",
    iconURL: "/icons/search.svg",
  },
  {
    title: "Don't stop Learning",
    description: "An atmosphere where learning is always on the to do list",
    iconURL: "/icons/search.svg",
  },
  {
    title: "Latest Technology stack",
    description: "Working experience of cutting edge Technologies",
    iconURL: "/icons/search.svg",
  },
  {
    title: "Cross domain exposure",
    description:
      "Highly passionate and cohessive team of technology and business people",
    iconURL: "/icons/search.svg",
  },
];

const jobData = [
  {
    id: 1,
    title: "Delivery Rider",
    type: "Full Time",
    location: "Forte Royal Estate (Lugbe)",
    linkApply: "https://github.com",
  },
  {
    id: 2,
    title: "In-Store Order Coordinator",
    type: "Full Time",
    location: "Forte Royal Estate (Lugbe)",
    linkApply: "/career/apply",
  },
  // You can add more job listings here
];

const WhyJoinUs = () => {
  return (
    <Container className="pb-16">
      <header className="space-y-5 text-center">
        <div className="mx-auto flex w-fit items-center gap-2">
          <div className="size-[6px] rounded-full bg-occupy-primary"></div>
          <h5 className="text-occupy-primary">BENEFITS</h5>
        </div>
        <h6 className="text-4xl">Why Join Us</h6>
      </header>
      <section className="my-11 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {WhyJoinUsData.map((data, index) => (
          <WhyJoinUsCard key={data.title} {...data} />
        ))}
      </section>
      <section id="featured-jobs">
        <header className="my-5 text-center">
          <h6 className="text-4xl">Featured Jobs</h6>
        </header>
        {jobData.map((job) => (
          <div
            key={job.id}
            className="mx-auto flex w-5/6 flex-col items-center justify-between gap-y-4 bg-[#F8F8F8] p-5 md:flex-row"
          >
            <div className="flex w-4/5 items-center">
              <p className="w-1/2 text-left text-lg">{job.title}</p>
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
                <p>{`${job.type} | ${job.location}`}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={job.linkApply}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-occupy-primary px-5 py-2 text-white"
              >
                APPLY NOW
              </a>
            </div>
          </div>
        ))}

        {/* <div className="mx-auto flex w-5/6 flex-col items-center justify-between gap-y-4 bg-[#F8F8F8] p-5 md:flex-row">
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
          <div>
            <button
              onClick={() => {
                Router.push("/career/apply");
              }}
              className="rounded-lg bg-occupy-primary px-5 py-2 text-white"
            >
              APPLY NOW
            </button>
          </div>
        </div> */}
      </section>
    </Container>
  );
};

export default WhyJoinUs;
