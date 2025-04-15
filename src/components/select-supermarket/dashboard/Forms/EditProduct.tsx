import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox"; // ADDED
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Image as ImgIcon } from "lucide-react";
import { useAppSelector } from "@/store/redux/hooks";
import {
  useEditProductMutation,
  useGetProductDetailQuery,
} from "@/store/redux/services/superMarketSlice/superMarketApiSlice";
import { useGetUserSupermarketsQuery } from "@/store/redux/services/superMarketSlice/superMarketApiSlice";
import Image from "next/image";

// UPDATED SCHEMA
const productSchema = z.object({
  product_id: z.string().min(1, "Product ID is required"),
  productName: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().optional(),
  photo: z.instanceof(File).optional(),
  price: z.string().refine(
    (val) => {
      const numValue = parseFloat(val.replace(/,/g, ""));
      return !isNaN(numValue) && numValue >= 0;
    },
    {
      message: "Price must be a valid non-negative number",
    },
  ),
  quantity: z.number().min(0, "Quantity must be non-negative"),
  in_stock: z.boolean().default(true), // ADDED
  category: z.object({
    pk: z.string().min(1, "Category is required"),
    value: z.string(),
    label: z.string(),
  }),
  tag: z.array(z.string()).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

const baseUrl = "https://backend.occupymart.com/api";

interface Category {
  id: number;
  category_image: string;
  category_name: string;
}

// UPDATED INTERFACE
interface Product {
  id: string;
  name: string;
  description: string;
  product_image: string;
  price: string;
  quantity: number;
  in_stock: boolean; // ADDED
  category: number;
}

const EditProduct: React.FC = () => {
  const router = useRouter();
  const { id: productId } = router.query;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userID = useAppSelector((state) => state.auth.userID);

  const { data: productDetail, isLoading: isFetchingProductDetail } =
    useGetProductDetailQuery({ productId }, { skip: !productId });

  const [categories, setCategories] = useState<
    Array<{ value: string; label: string; pk: string }>
  >([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // UPDATED DEFAULT VALUES
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product_id: (productId as string) || "",
      productName: "",
      description: "",
      price: "",
      quantity: 0,
      in_stock: true, // ADDED
      category: { value: "", label: "", pk: "" },
      tag: [],
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await fetch(`${baseUrl}/admin/list-categories/`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data: Category[] = await response.json();

        const formattedCategories = data.map((category) => ({
          label: category.category_name,
          value: category.id.toString(),
          pk: category.id.toString(),
        }));

        setCategories(formattedCategories);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch categories",
          variant: "destructive",
        });
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [toast]);

  // UPDATED FORM RESET
  useEffect(() => {
    if (productDetail && categories.length > 0) {
      const currentCategory = categories.find(
        (c) => c.value === productDetail.category.toString(),
      );

      form.reset({
        product_id: productId as string,
        productName: productDetail.name,
        description: productDetail.description,
        price: productDetail.price,
        quantity: productDetail.quantity,
        in_stock: productDetail.in_stock, // ADDED
        category: currentCategory || { value: "", label: "", pk: "" },
        tag: [],
      });
    }
  }, [productDetail, categories, form, productId]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("photo", file);
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const [editProductMutation] = useEditProductMutation();

  // UPDATED SUBMIT HANDLER
  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      const token = sessionStorage.getItem("token");
      console.log("This is the sessionStorage", sessionStorage);

      if (!token) {
        toast({
          title: "Error",
          description: "Please login again",
          variant: "destructive",
        });
        router.push("/login");
        return;
      }

      const formData = new FormData();
      formData.append("name", data.productName);
      formData.append("price", data.price.replace(/,/g, ""));
      formData.append("description", data.description!.toString());
      formData.append("category", data.category.pk);
      formData.append("quantity", data.quantity.toString());
      formData.append("in_stock", data.in_stock.toString()); // ADDED
      if (data.photo) formData.append("product_image", data.photo);

      const response = await fetch(
        `${baseUrl}/store/edit-product/${productId}/`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Product update failed");
      }

      toast({
        title: "Success",
        description: "Product updated successfully!",
        variant: "default",
      });
      router.back();
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Update failed",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFetchingProductDetail || loadingCategories) {
    return <div>Loading product data...</div>;
  }

  return (
    <div className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-2xl font-medium text-gray-700">
                Edit Product
              </h1>
              <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
                Dashboard / Product List / Edit Product
              </nav>
            </div>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Edit Product"}
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">
                  General Information
                </h2>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Product description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">Media</h2>
                <div className="flex flex-col items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        width={200}
                        height={200}
                        className="rounded-lg object-cover"
                      />
                    ) : productDetail?.product_image ? (
                      <Image
                        src={productDetail.product_image}
                        alt={productDetail.name}
                        width={200}
                        height={200}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-48 w-48 items-center justify-center rounded-lg bg-gray-100">
                        <ImgIcon
                          width={48}
                          height={48}
                          className="text-gray-400"
                        />
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">Pricing</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter price"
                            {...field}
                            onChange={(e) => {
                              let value = e.target.value.replace(
                                /[^\d.,]/g,
                                "",
                              );
                              const parts = value.split(".");
                              if (parts.length > 2) parts.pop();
                              value = parts.join(".");
                              field.onChange(value);
                            }}
                            onBlur={(e) => {
                              const value = e.target.value.replace(/,/g, "");
                              if (value) {
                                const numValue = parseFloat(value);
                                if (!isNaN(numValue)) {
                                  const formatted = numValue.toLocaleString(
                                    "en-US",
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    },
                                  );
                                  field.onChange(formatted);
                                }
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter quantity"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* ADDED IN STOCK CHECKBOX */}
                  <FormField
                    control={form.control}
                    name="in_stock"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="h-6 w-6" // Add this to make checkbox bigger
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-lg">In Stock</FormLabel>{" "}
                          {/* Increased text size */}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Category & Tags</h2>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const selected = categories.find(
                            (c) => c.value === value,
                          );
                          form.setValue(
                            "category",
                            selected || { value: "", label: "", pk: "" },
                          );
                        }}
                        value={form.watch("category.value")}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditProduct;
