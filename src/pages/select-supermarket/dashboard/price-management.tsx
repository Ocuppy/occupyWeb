import { columns } from "@/components/select-supermarket/dashboard/GroceryTable/column";
import { DataTable } from "@/components/select-supermarket/dashboard/GroceryTable/data-table";
import InventoryCard from "@/components/select-supermarket/dashboard/InventoryCard";
import products from "@/data/productData";
import { NextPageWithLayout } from "@/pages/_app";
import React from "react";

const PriceManagement: NextPageWithLayout = () => {
  return (
    <div>
      {/* <InventoryCard /> */}
      {/* <DataTable data={products} columns={columns} /> */}
    </div>
  );
};

export default PriceManagement;
