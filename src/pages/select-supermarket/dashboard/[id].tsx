import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/store/redux/services/superMarketSlice/superMarketApiSlice";
import ProductCard from "@/components/Product";
import UserDashboard from "@/components/select-supermarket/select-supermarket/UserDashboard";
import products from "@/data/productData";
import { ArrowLeft } from "lucide-react";

const ProductsList = () => {
  const router = useRouter();
  const { id: supermarket_id } = router.query;

  // console.log("Router query:", router.query);
  // console.log("Fetching products with supermarket_id:", supermarket_id);
  // console.log("Store ID:", supermarket_id);

  const {
    data: productsData,
    error: productsError,
    isLoading: isProductsLoading,
    refetch,
  } = useGetProductsQuery({ supermarket_id }, { skip: !supermarket_id });

  console.log("Products Response:", productsData);
  const products = productsData;
  // const categories = []; // Define categories array
  const [categories, setCategories] = useState<
    Array<{
      id: number;
      category_name: string;
      category_image: string;
    }>
  >([]);

  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://backend.occupymart.com/api/admin/list-categories/",
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

  // Delete Product
  const handleProductDelete = async (productId: string) => {
    try {
      await deleteProduct({ product_id: productId }).unwrap();
      refetch();
    } catch (error) {
      console.error(`${error} - Failed to delete the product`);
    }
  };

  /**
   * @description Edit Product
   * @param productId
   */
  const handleProductEdit = (productId: string) => {
    router.push(`/dashboard/inventory/${productId}/edit`);
  };

  if (!supermarket_id) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isProductsLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (productsError) {
    console.error("Products Error:", productsError);
    return (
      <div className="flex h-full items-center justify-center text-red-500">
        Error loading products. Please try again.
      </div>
    );
  }

  if (isDeleteLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

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
              router.push(`/dashboard/inventory/${supermarket_id}/add`)
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
                router.push(`/dashboard/inventory/${supermarket_id}/add`)
              }
            >
              Add First Product
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (products.length > 0) {
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
              router.push(`/dashboard/inventory/${supermarket_id}/add`)
            }
          >
            Add Product
          </Button>
        </div>
        <UserDashboard />
        <div className="mx-auto mt-8 grid max-w-[85%] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* {products.map(
            (product: {
              id: string;
              name: string;
              description: string;
              product_image: string;
              price: string;
              supermarket_id: string;
              category: string;
              quantity: number;
            }) => (
              <ProductCard
                key={product.id}
                // name={product.name}
                product={product}
                onClickProduct={() => {
                  console.log("Product ID:", product.id);
                  router.push(
                    `/dashboard/inventory/${supermarket_id}/product/${product.id}`,
                  );
                }}
              />
            ),
          )} */}

          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              categories={categories} // Pass categories to ProductCard
              onClickProduct={() => {
                // router.push(
                //   `/dashboard/inventory/${supermarket_id}/product/${product.id}`,
                // );
              }}
              onDeleteProduct={handleProductDelete}
              onEditProduct={handleProductEdit}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default ProductsList;
