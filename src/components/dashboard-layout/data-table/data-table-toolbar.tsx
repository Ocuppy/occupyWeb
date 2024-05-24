import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/dashboard-layout/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/dashboard-layout/data-table/data-table-view-options";
import { X } from "lucide-react";
import { priority_options, status_options } from "../../filters";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center px-4 pb-4 justify-between">
      <div className="flex gap-2 items-center ">
        <span>Recent Orders</span>
        <div className="bg-[#0D894F] bg-opacity-25 text-[#0D894F] py-1 px-2 rounded-full">
          +2 Orders
        </div>
      </div>

      {/* <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search your grocery category etc..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={status_options}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priority_options}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div> */}
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Search your grocery category etc..."
          value={(table.getColumn("product")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("product")?.setFilterValue(event.target.value)}
          className="h-[38px] w-[150px] lg:w-[250px] text-black"
        />
        <DataTableViewOptions table={table} />
        <Button className="py-1 px-3">See More</Button>
      </div>
    </div>
  );
}
