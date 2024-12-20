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
    title: "Explore Your Estate's Supermarket Inventory Anytime, Conveniently",
    description:
      "Browse items, add them to your cart, and enjoy fast delivery with convenient payment options like cash or card all from your mobile device.",
  },
  rider: {
    image: RiderMockup,
    title: "Earn Weekly with Us—Ride a bicycle and Get Paid!🚀",
    description:
      "Get paid weekly with a whooping 10k just for riding within the estate. Manage deliveries and routes with ease, all through our app",
  },
  supermarket: {
    image: SupermarketMockup,
    title: "You can have an online presence even within the estate",
    description:
      "Manage inventory, track orders, and increase sales around the clock. Let your store never sleep.",
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
      className="mx-auto mt-5 w-full px-5 md:mt-24"
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
              className={`rounded-full px-6 py-6 text-base font-semibold capitalize md:px-8 md:text-[1.375rem] ${
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
            <p className="mb-4 text-4xl font-bold leading-tight text-[#090335] lg:text-[36px]">
              {mockupObj.title}
            </p>
            <p className="text-2xl leading-tight text-[#9A9797] lg:text-[21px]">
              {mockupObj.description}
            </p>
          </div>
        </div>
      </>
    </Container>
  );
};

export default MockupSlider;
