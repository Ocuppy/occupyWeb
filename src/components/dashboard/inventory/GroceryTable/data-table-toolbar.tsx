import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import Router from "next/router";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center gap-6 px-4 pb-4 justify-between">
      <h1 className="text-[#1C2A53] w-[30%] font-medium text-xl">Grocery Inventory</h1>
      <Input
        placeholder="Search your grocery category etc..."
        className="h-[38px] w-full text-black"
        value={(table.getColumn("item")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("item")?.setFilterValue(event.target.value)}
      />
      <div className="flex gap-2 items-center">
        <Button onClick={() => Router.push("/dashboard/inventory/add")} className="py-1 px-3">
          Add Product
        </Button>
        <DataTableViewOptions table={table} />
        <Button className="py-1 px-3 bg-transparent border text-[#5D6679]">Download all</Button>
      </div>
    </div>
  );
}
