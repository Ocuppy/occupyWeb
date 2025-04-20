import ProductCard from "@/components/Product";
import { Product } from "@/pages/select-supermarket/inventory/[id]";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Search } from "lucide-react";

interface StoreProductsProps {
  productList: Product[];
  categories: Array<{
    id: number;
    category_name: string;
    category_image: string;
  }>;
  handleClickProduct: (productId: string) => void;
  handleProductDelete: (productId: string) => void;
  handleProductEdit: (productId: string) => void;
}

export default function StoreProducts({
  productList,
  categories,
  handleClickProduct,
  handleProductDelete,
  handleProductEdit,
}: StoreProductsProps) {
  const [products, setProducts] = useState(productList);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  // Filter products based on search term
  useEffect(() => {
    const filtered = searchTerm
      ? _.filter(products, (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : products;

    setFilteredProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / pageSize));
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, products, pageSize]);

  // Get current page of products
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return _.slice(filteredProducts, startIndex, startIndex + pageSize);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const maxPagesToShow = 10;
    const pageNumbers = [];

    if (totalPages <= maxPagesToShow) {
      // If we have fewer pages than the max, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push({ page: i, display: i.toString() });
      }
    } else {
      // Always show first page
      pageNumbers.push({ page: 1, display: "1" });

      if (currentPage > 4) {
        // Add ellipsis if current page is far from the beginning
        pageNumbers.push({ page: null, display: "..." });
      }

      // Calculate range around current page
      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, currentPage + 2);

      // Adjust range to show more pages if we're at the beginning or end
      if (currentPage <= 4) {
        endPage = Math.min(totalPages - 1, 6);
      } else if (currentPage > totalPages - 4) {
        startPage = Math.max(2, totalPages - 6);
      }

      // Add page numbers around current page
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push({ page: i, display: i.toString() });
      }

      if (currentPage < totalPages - 3) {
        // Add ellipsis if current page is far from the end
        pageNumbers.push({ page: null, display: "..." });
      }

      // Always show last page
      pageNumbers.push({ page: totalPages, display: totalPages.toString() });
    }

    return pageNumbers;
  };

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-6 mt-4 max-w-lg">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search size={20} className="text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-4 pl-14 focus:outline-none focus:ring-2 focus:ring-occupy-primary"
        />
      </div>

      <div className="mx-auto mt-8 grid w-full grid-cols-2 gap-6 px-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
        {getCurrentPageItems().map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            categories={categories}
            className="h-[200px] w-full p-2 text-sm transition-all hover:scale-105 hover:shadow-md"
            onClickProduct={() => handleClickProduct(product.id)}
            onDeleteProduct={handleProductDelete}
            onEditProduct={handleProductEdit}
          />
        ))}
      </div>

      {getCurrentPageItems().length === 0 && (
        <div>
          <h1 className="text-2xl font-bold">No products found</h1>
          <p>Try adjusting your search term.</p>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-base text-gray-600">
          Showing{" "}
          {filteredProducts.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}{" "}
          to {Math.min(currentPage * pageSize, filteredProducts.length)} of{" "}
          {filteredProducts.length} products
        </div>
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded-md px-4 py-2 ${currentPage === 1 ? "cursor-not-allowed bg-gray-200 text-gray-400" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            Previous
          </button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((item, index) =>
              item.page === null ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-4 py-2 text-gray-700"
                >
                  {item.display}
                </span>
              ) : (
                <button
                  key={`page-${item.page}`}
                  onClick={() => handlePageChange(item.page)}
                  className={`rounded-md px-4 py-2 ${currentPage === item.page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                >
                  {item.display}
                </button>
              ),
            )}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`ml-4 rounded-md px-4 py-2 ${currentPage === totalPages ? "cursor-not-allowed bg-gray-200 text-gray-400" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
