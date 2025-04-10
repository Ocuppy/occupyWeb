import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalItems = table.getCoreRowModel().rows.length;
  const pageCount = table.getPageCount();

  const startItem = currentPage * pageSize + 1;
  const endItem = Math.min(startItem + pageSize - 1, totalItems);

  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i);

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        Showing {startItem}-{endItem} from {totalItems}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className={`h-8 w-8 p-0 ${
              !table.getCanPreviousPage()
                ? "text-occupy-primary bg-[#DEDEFA]"
                : "bg-occupy-primary text-white hover:text-occupy-primary border-none"
            }`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {pageNumbers.map((pageNumber) => (
            <Button
              key={pageNumber}
              variant="outline"
              className={`h-8 w-8 p-0 ${
                pageNumber === currentPage
                  ? "bg-occupy-primary text-white hover:text-occupy-primary border-none"
                  : "bg-[#DEDEFA] text-occupy-primary border-none hover:text-occupy-primary"
              }`}
              onClick={() => table.setPageIndex(pageNumber)}
            >
              {pageNumber + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            className={`h-8 w-8 p-0 ${
              !table.getCanNextPage()
                ? "text-occupy-primary bg-[#DEDEFA]"
                : "bg-occupy-primary text-white hover:text-occupy-primary border-none"
            }`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
