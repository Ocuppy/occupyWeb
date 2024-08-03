import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center px-4 pb-4 justify-between">
      <div className="flex gap-2 items-center ">
        <span>Rider&apos;s Assigning</span>
        <div className="bg-[#0D894F] bg-opacity-25 text-[#0D894F] py-1 px-2 rounded-full">
          +2 Orders
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <Input
          placeholder="Search by Rider's..."
          value={(table.getColumn("item")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("item")?.setFilterValue(event.target.value)}
          className="h-[38px] w-[150px] lg:w-[250px] text-black"
        />
        <DataTableViewOptions table={table} />
        <Button className="py-1 px-3">See More</Button>
      </div>
    </div>
  );
}
