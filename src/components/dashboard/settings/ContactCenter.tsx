import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";
import {
  BusinessInfoIcon,
  CreateOccupyIcon,
  OnboardingIcon,
} from "./contact-icons";
import Flex from "@/components/shared/Flex";
import CenteredFlex from "@/components/shared/CenteredFlex";
import { Button } from "@/components/ui/button";

const ContactCenter = () => {
  const FAQ_DATA = [
    {
      title: "Create an Occupy Acocunt",
      desc: [
        "Guide to get started faster",
        "Video tutorials for beginners",
        "Moving to Bolt system",
      ],
      Icon: CreateOccupyIcon,
    },
    {
      title: "Onboarding",
      desc: [
        "Setting up your Farm Profile",
        "Changing business name",
        "Changing email address",
      ],
      Icon: OnboardingIcon,
    },
    {
      title: "Business Information",
      desc: ["Payment declined", "Get a refund", "Subscriptions"],
      Icon: BusinessInfoIcon,
    },
  ];
  return (
    <div>
      <p className="nunito text-[24px] font-bold text-[#131523] mb-4">
        Frequently Asked Question
      </p>
      <div className="relative ">
        <Input placeholder="Search..." className="pl-10 py-6" />
        <SearchIcon
          stroke="#151B26"
          className="absolute size-[21px] left-3 top-[50%] translate-y-[-50%]"
        />
      </div>
      <div className="flex gap-4 flex-wrap mt-12 justify-between">
        {FAQ_DATA.map(({ desc, Icon, title }, i) => (
          <div className="text-[#131523] w-[180px]" key={i}>
            <CenteredFlex className="w-full mb-4">
              <Icon className="size-[110px]" />
            </CenteredFlex>
            <p className="text-[20px] font-medium mb-4">{title}</p>
            <div className="flex flex-col gap-4 text-[14px]">
              {desc.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
            <Button
              variant={"link"}
              className="px-0 text-[14px] font-[400] text-occupy-primary"
            >
              More Tutorials
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactCenter;
