import DashboardCard from "@/components/shared/DashboardCard";
import Flex from "@/components/shared/Flex";
import WalletBalance from "@/components/shared/WalletBalance";
import CategoryItem from "@/components/select-supermarket/select-supermarket/CategoryItem";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Router from "next/router";

const SupermarketDetails = ({ onBack }: { onBack?: () => void }) => {
  return (
    <div>
      <Button
        onClick={onBack}
        variant={"outline"}
        className="border-gray-600 gap-2"
      >
        <ArrowLeft />
        <span>Back</span>
      </Button>
      <ScrollArea>
        <div className="flex gap-4">
          {/* <GreetingsCard /> */}
          <WalletBalance />

          <DashboardCard title="Total Revenue" value={12} />
          <DashboardCard title="Total item Sold" value={12} />
          <DashboardCard title="Order Fulfilled" value={12} />
          <ScrollBar orientation="horizontal" />
        </div>
      </ScrollArea>
      {/* <AccountStatus /> */}
      <Flex className="my-4 mx-8 justify-between">
        <p className="text-[20px] font-semibold text-[#1A1A1A] nunito">
          Categories
        </p>
        <Button className="text-[#00B207] gap-2" variant={"link"}>
          <span>View All</span>
          <ArrowRight />
        </Button>
      </Flex>
      <ScrollArea className="w-full mt-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:flex 2xl:flex-wrap gap-4">
          {Array(16)
            .fill("i")
            .map((_, idx) => (
              <CategoryItem
                onClick={() => Router.push("/dashboard/inventory/2")}
                key={idx}
                title={`Product ${idx + 1}`}
              />
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default SupermarketDetails;
