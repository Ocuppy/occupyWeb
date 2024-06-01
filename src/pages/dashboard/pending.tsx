import { NextPageWithLayout } from "../_app";
import DashboardCard from "@/components/shared/DashboardCard";
import Flex from "@/components/shared/Flex";
import WalletBalance from "@/components/shared/WalletBalance";
import CategoryItem from "@/components/dashboard/dashboard/CategoryItem";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Pending: NextPageWithLayout = () => {
  return (
    <div>
      <div className="grid gap-4 items-center grid-rows-auto md:grid-cols-[auto,1fr] lg:grid-cols-[auto,1fr,1fr]">
        {/* <GreetingsCard /> */}
        <WalletBalance />

        <DashboardCard title="Total Revenue" value={12} />
        <DashboardCard title="Total item Sold" value={12} />
        <DashboardCard title="Order Fulfilled" value={12} />
        {/* <WalletBalance /> */}
      </div>
      {/* <AccountStatus /> */}
      <Flex className="my-4 mx-8 justify-between">
        <p className="text-[20px] font-semibold text-[#1A1A1A] font-nunito">
          Categories
        </p>
        <Button className="text-[#00B207] gap-2" variant={"link"}>
          <span>View All</span>
          <ArrowRight />
        </Button>
      </Flex>
      <ScrollArea className="w-full mt-12">
        <Flex className="">
          {Array(16)
            .fill("i")
            .map((_, idx) => (
              <CategoryItem key={idx} title={`Product ${idx + 1}`} />
            ))}
        </Flex>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default Pending;
