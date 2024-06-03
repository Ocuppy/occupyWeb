import React from "react";
import { useRouter } from "next/router";
import products from "@/data/productData";
import InventoryCard from "@/components/dashboard/inventory/InventoryCard";
import { DataTable } from "@/components/dashboard/inventory/GroceryTable/data-table";
import { columns } from "@/components/dashboard/inventory/GroceryTable/column";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const product = products.find((product) => product.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <InventoryCard />
      <DataTable data={products} columns={columns} />
    </div>
  );
};

export default ProductDetail;
