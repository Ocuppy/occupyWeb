import { NextPageWithLayout } from "../_app";
import GreetingsCard from "@/components/shared/GreetingsCard";
import DashboardCard from "@/components/shared/DashboardCard";
import Flex from "@/components/shared/Flex";
import WalletBalance from "@/components/shared/WalletBalance";
import AccountStatus from "@/components/dashboard/dashboard/AccountStatus";
import Image from "next/image";
import DiabeticFood from "@/assets/images/diabetic food.png";
import CategoryItem from "@/components/dashboard/dashboard/CategoryItem";
import { Carousel, CarouselContent } from "@/components/ui/carousel";

const Pending: NextPageWithLayout = () => {
  return (
    <div>
      <Flex className="flex-wrap">
        <GreetingsCard />
        <DashboardCard title="Total Revenue" value={12} />
        <DashboardCard title="Total item Sold" value={12} />
        <DashboardCard title="Order Fulfilled" value={12} />
        <WalletBalance />
      </Flex>
      {/* <AccountStatus /> */}

      <Flex className="">
        {Array(3)
          .fill("i")
          .map((_, idx) => (
            <CategoryItem key={idx} title={`Product ${idx + 1}`} />
          ))}
      </Flex>
    </div>
  );
};

export default Pending;
