import Inventory from "@/components/dashboard/inventory";
import InventoryCard from "@/components/dashboard/inventory/InventoryCard";
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
