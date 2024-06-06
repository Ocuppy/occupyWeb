import { Table, TableBody, TableHeader } from "@/components/ui/table";
import React, { ReactNode } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import TablePagination from "./TablePagination";

interface TableDemoProps {
  TableHeadComponent?: React.JSX.Element;
  TableTopBar?: React.JSX.Element;
  children: ReactNode;
  containerClassName?: string | undefined;
  currentPage: number;
  totalPages: number;
}

export function CustomTable({
  TableHeadComponent,
  children,
  TableTopBar,
  containerClassName,
  currentPage,
  totalPages,
}: TableDemoProps) {
  return (
    <div className={cn("mt-12", containerClassName)}>
      <div className="mb-4">{TableTopBar}</div>
      <ScrollArea className=" w-full ">
        <Table className="">
          <TableHeader>{TableHeadComponent}</TableHeader>
          <TableBody>{children}</TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="mt-8">
        <TablePagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}
