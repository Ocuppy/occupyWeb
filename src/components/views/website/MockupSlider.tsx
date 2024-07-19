import CustomerMockup from "@/assets/images/customer-mockup.png";
import RiderMockup from "@/assets/images/rider-mockup.png";
import SupermarketMockup from "@/assets/images/supermarket-mockup.png";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface MockupItem {
  image: StaticImageData;
  title: string;
  description: string;
}

const mockupData: Record<string, MockupItem> = {
  customer: {
    image: CustomerMockup,
    title: "Keep your cash flow clear and keep increasing 🚀",
    description:
      "See it all at a glance when you link your cash accounts, credit cards, investment, and bills.",
  },
  rider: {
    image: RiderMockup,
    title: "Keep your cash flow clear and keep increasing",
    description:
      "See it all at a glance when you link your cash accounts, credit cards, investment, and bills.",
  },
  supermarket: {
    image: SupermarketMockup,
    title: "Keep your cash flow clear and keep increasing",
    description:
      "See it all at a glance when you link your cash accounts, credit cards, investment, and bills.",
  },
};

const MockupSlider = () => {
  const TabHeads = Object.keys(mockupData);
  const [currentTab, setCurrentTab] = useState("customer");
  const mockupObj = mockupData[currentTab];

  return (
    <Container
      style={{
        backgroundImage: `url(/mockup-bg.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
      className="mx-auto mt-24 w-full"
    >
      <>
        <div className="mx-auto flex w-fit flex-wrap gap-4">
          {TabHeads.map((tab) => (
            <Button
              onClick={() => {
                console.log(tab);
                setCurrentTab(tab);
              }}
              key={tab}
              value={tab}
              className={`rounded-full px-8 py-6 text-[16px] font-semibold capitalize md:text-[22px] ${
                currentTab === tab
                  ? "bg-occupy-primary text-white hover:bg-occupy-primary hover:text-white"
                  : "bg-[#FFE2F3] text-black hover:bg-[#FFE2F3] hover:opacity-90"
              }`}
              variant={"ghost"}
            >
              {tab}
            </Button>
          ))}
        </div>
        <div className="mt-8 grid items-center gap-4 pb-12 md:grid-cols-2 md:pb-0">
          <Image src={mockupObj.image} alt={"mockup-image"} />
          <div className="w-full md:w-[90%]">
            <p className="mb-4 text-[36px] font-bold text-[#090335]">
              {mockupObj.title}
            </p>
            <p className="text-[24px] leading-[97%] text-[#9A9797]">
              {mockupObj.description}
            </p>
          </div>
        </div>
      </>
    </Container>
  );
};

export default MockupSlider;
