import { columns } from "@/components/dashboard/inventory/GroceryTable/column";
import { DataTable } from "@/components/dashboard/inventory/GroceryTable/data-table";
import InventoryCard from "@/components/dashboard/inventory/InventoryCard";
import products from "@/data/productData";
import { NextPageWithLayout } from "@/pages/_app";
import React from "react";

const PriceManagement: NextPageWithLayout = () => {
  return (
    <div>
      <InventoryCard />
      <DataTable data={products} columns={columns} />
    </div>
  );
};

export default PriceManagement;
