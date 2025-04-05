import Inventory from "@/components/select-supermarket/dashboard";
import InventoryCard from "@/components/select-supermarket/dashboard/InventoryCard";
import { NextPageWithLayout } from "@/pages/_app";
import React from "react";

const Page: NextPageWithLayout = () => {
  return (
    <div>
      <InventoryCard />
      <Inventory />
    </div>
  );
};

export default Page;
