import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/store/redux/services/superMarketSlice/superMarketApiSlice";
import ProductCard from "@/components/Product";
import UserDashboard from "@/components/select-supermarket/select-supermarket/UserDashboard";

interface Product {
  id: string;
  name: string;
  description: string;
  product_image: string;
  price: string;
  supermarket_id: string;
  category: string;
  quantity: number;
  in_stock: boolean;
}

interface Category {
  id: number;
  category_name: string;
  category_image: string;
}

const ProductsList = () => {
  const router = useRouter();
  const { id: supermarket_id } = router.query;

  const {
    data: productsData,
    error: productsError,
    isLoading: isProductsLoading,
    refetch,
  } = useGetProductsQuery({ supermarket_id }, { skip: !supermarket_id });

  const [categories, setCategories] = useState<Category[]>([]);
  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://backend.occupyestate.com/api/admin/list-categories/",
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleClickProduct = (productId: string) => {
    // console.log("Product clicked:", productId);
  };

  const handleProductDelete = async (productId: string) => {
    try {
      await deleteProduct({ product_id: productId }).unwrap();
      refetch();
    } catch (error) {
      console.error(`${error} - Failed to delete the product`);
    }
  };

  const handleProductEdit = (productId: string) => {
    router.push(`/select-supermarket/dashboard/${productId}/edit`);
  };

  if (!supermarket_id || isProductsLoading || isDeleteLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="flex h-full items-center justify-center text-red-500">
        Error loading products. Please try again.
      </div>
    );
  }

  // Transform products data with default in_stock value
  const products: Product[] = productsData 
    ? productsData.map((product: Product) => ({
        ...product,
        in_stock: product.in_stock ?? product.quantity > 0
      }))
    : [];

  if (products.length === 0) {
    return (
      <div className="h-full rounded-md bg-white px-4 py-6">
        <UserDashboard />
        <div className="flex items-center justify-between">
          <ArrowLeft
            onClick={() => router.push("/dashboard")}
            className="cursor-pointer"
          />
          <p className="text-[20px] font-medium">Manage Products</p>
          <Button
            onClick={() =>
              router.push(`/select-supermarket/dashboard/${supermarket_id}/add`)
            }
          >
            Add Product
          </Button>
        </div>
        <div className="mx-auto mt-8 flex max-w-[540px] flex-col gap-8">
          <div className="flex h-[250px] flex-col items-center justify-center gap-4 rounded-lg p-9 shadow-lg">
            <Image
              src="/icons/check.svg"
              width={58}
              height={58}
              alt="empty state icon"
            />
            <h1 className="text-2xl font-bold">No products added</h1>
            <p>
              Start adding products to your inventory to manage your store
              effectively.
            </p>
            <Button
              type="submit"
              size="lg"
              onClick={() =>
                router.push(
                  `/select-supermarket/dashboard/${supermarket_id}/add`,
                )
              }
            >
              Add First Product
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full rounded-md bg-gray-100 px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ArrowLeft
            onClick={() => router.push("/dashboard")}
            className="cursor-pointer"
          />
          <p className="text-[20px] font-medium">Manage Products</p>
        </div>
        <Button
          onClick={() =>
            router.push(`/select-supermarket/dashboard/${supermarket_id}/add`)
          }
        >
          Add Product
        </Button>
      </div>

      <UserDashboard />
      
      {/* Responsive product grid limited to 15 products */}
      <div className="product-grid-container">
        <div className="mx-auto mt-8 grid w-full gap-8 px-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products.slice(0, 15).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categories={categories}
              className="w-full h-[200px] p-2 text-sm transition-all hover:scale-105 hover:shadow-md"
              onClickProduct={() => handleClickProduct(product.id)}
              onDeleteProduct={handleProductDelete}
              onEditProduct={handleProductEdit}
            />
          ))}
        </div>

        {/* View All Products button - will show when there are 16+ products */}
        {products.length > 15 && (
  <div className="mt-8 flex justify-center">
    <Button
      onClick={() => router.push(`/select-supermarket/inventory/${supermarket_id}`)}
      size="lg"
      className="border-gray-300 text-white"
    >
      View All Products ({products.length})
    </Button>
  </div>
)}
      </div>
    </div>
  );
};

export default ProductsList;
