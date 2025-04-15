import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between px-4 pb-4 text-sm sm:text-base">
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap">Orders</span>
        {/* <div className="rounded-full bg-[#0D894F] text-xs sm:text-base bg-opacity-25 px-2 py-1 text-[#0D894F]">
          +2 Orders
        </div> */}
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search your grocery category etc..."
          value={(table.getColumn("product")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("product")?.setFilterValue(event.target.value)
          }
          className="h-[38px] w-[150px] text-black lg:w-[250px]"
        />
        <DataTableViewOptions table={table} />
        <Button className="px-3 py-1 text-sm sm:text-base">See More</Button>
      </div>
    </div>
  );
}
