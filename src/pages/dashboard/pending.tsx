import React from "react";
import { NextPageWithLayout } from "../_app";
import GreetingsCard from "@/components/shared/GreetingsCard";
import DashboardCard from "@/components/shared/DashboardCard";
import Flex from "@/components/shared/Flex";
import WalletBalance from "@/components/shared/WalletBalance";

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
    </div>
  );
};

export default Pending;
