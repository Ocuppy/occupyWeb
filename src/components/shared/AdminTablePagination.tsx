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
import { PlusIcon } from "lucide-react";
import SpaceBetween from "./SpaceBetween";

const AdminTablePagination = ({
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
    <Pagination>
      <PaginationContent className="gap-4 flex justify-between w-full flex-wrap">
        <PaginationItem onClick={() => {}} className="p-0  border">
          <PaginationLink className="w-full" variant="outline">
            <PlusIcon />
            <span>Previous</span>
          </PaginationLink>
        </PaginationItem>
        <Flex>
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
                <PaginationLink
                  variant="outline"
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </Flex>
        <PaginationItem onClick={() => {}} className="p-0 border">
          <PaginationLink className="w-full" variant="outline">
            <span>Next</span>
            <PlusIcon />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AdminTablePagination;
