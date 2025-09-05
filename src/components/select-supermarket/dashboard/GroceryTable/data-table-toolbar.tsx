import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import Router from "next/router";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between gap-6 px-4 pb-4">
      <h1 className="text-xl font-medium text-[#1C2A53]">Product Listing</h1>
      <input
        type="search"
        name=""
        id=""
        className="h-10 w-full max-w-[500px] rounded-lg bg-[#F9FAFB] px-3 py-6 text-sm ring-offset-white file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
        placeholder="Search for products etc..."
        value={(table.getColumn("item")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("item")?.setFilterValue(event.target.value)
        }
      />

      <div className="flex items-center gap-2">
        <Button
          onClick={() => Router.push("/dashboard/inventory/add")}
          className="px-3 py-1"
        >
          Add Product
        </Button>
        <DataTableViewOptions table={table} />
        <Button className="border bg-transparent px-3 py-1 text-[#5D6679]">
          Download all
        </Button>
      </div>
    </div>
  );
}
