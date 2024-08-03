import { columns } from "@/components/dashboard/inventory/GroceryTable/column";
import { DataTable } from "@/components/dashboard/inventory/GroceryTable/data-table";
import InventoryCard from "@/components/dashboard/inventory/InventoryCard";
import products from "@/data/productData";
import { NextPageWithLayout } from "@/pages/_app";
import { ChevronDown, X, Filter } from "lucide-react";
import React from "react";

const Pending: NextPageWithLayout = () => {
  return (
    // <div>
    //   <InventoryCard />
    //   <DataTable data={products} columns={columns} />
    // </div>
    <section>
      <header className="flex w-full items-center justify-between p-4">
        <button className="mr-5 flex items-center gap-2 rounded-md bg-white px-3 py-2 shadow-sm hover:bg-occupy-primary/15">
          Filters <ChevronDown className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-x-2">
          <button className="flex items-center rounded-md bg-[#E6E9F4] px-3 py-1 text-[#5A607F]">
            Grocery <X className="ml-1 h-3 w-3 cursor-pointer" />
          </button>
          <button className="flex items-center rounded-md bg-[#E6E9F4] px-3 py-1 text-[#5A607F]">
            August <X className="ml-1 h-3 w-3 cursor-pointer" />
          </button>
          <button className="flex items-center rounded-md bg-[#E6E9F4] px-3 py-1 text-[#5A607F]">
            Wholefood <X className="ml-1 h-3 w-3 cursor-pointer" />
          </button>
        </div>
        <button className="ml-auto flex items-center rounded-md bg-occupy-primary px-4 py-2 text-white">
          <Filter className="mr-2 h-4 w-4" /> Filters
        </button>
      </header>
      <div className="occupy-shadow">
        <DataTable data={products} columns={columns} />
      </div>
    </section>
  );
};

export default Pending;
