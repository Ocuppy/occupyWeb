import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getVisiblePages } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import Flex from "./Flex";

const TablePagination = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) => {
  const [showFullPagination, setShowFullPagination] = useState(false);
  const itemsPerPage = 10;
  const totalItems = totalPages * itemsPerPage;

  const handleEllipsisClick = () => {
    setShowFullPagination(true);
  };

  const visiblePages = getVisiblePages(
    showFullPagination,
    currentPage,
    totalPages
  );

  const { toast } = useToast();

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Flex className="gap-4 justify-between flex-wrap">
      <p className="text-[14px] text-[#667085] font-medium">
        {`Showing ${startItem}-${endItem} of ${totalItems}`}
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem className="p-0">
            <PaginationPrevious
              disabled={currentPage === 1}
              onClick={() => {
                /* handle previous click */
              }}
            />
          </PaginationItem>
          {visiblePages.map((page, index) => (
            <PaginationItem
              className="hover:cursor-pointer"
              onClick={() => {
                if (typeof page === "number") {
                  toast({
                    title: `${page} was selected`,
                    description: "New page",
                  });
                }
              }}
              key={index}
            >
              {page === "..." ? (
                <PaginationEllipsis onClick={handleEllipsisClick} />
              ) : (
                <PaginationLink isActive={page === currentPage}>
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              disabled={currentPage === totalPages}
              onClick={() => {
                /* handle next click */
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Flex>
  );
};

export default TablePagination;
