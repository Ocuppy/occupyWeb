/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multiSelect";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Image } from "lucide-react";
import { useAppSelector } from "@/store/redux/hooks";
import { useAddProductMutation } from "@/store/redux/services/superMarketSlice/superMarketApiSlice";
import { useGetUserSupermarketsQuery } from "@/store/redux/services/superMarketSlice/superMarketApiSlice";
// import { useGetSupermarketProfileQuery } from "@/store/redux/services/profileSlice/profileApiSlice";

const productSchema = z.object({
  supermarket: z.string().min(1, "Supermarket is required"),
  productName: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().optional(),
  photo: z.instanceof(File).optional(),
  // price: z.string().refine((val) => !isNaN(parseFloat(val)), {
  //   message: "Price must be a valid number",
  // }),
  price: z.string().refine(
    (val) => {
      // Remove commas and validate as number
      const numValue = parseFloat(val.replace(/,/g, ""));
      return !isNaN(numValue) && numValue >= 0;
    },
    {
      message: "Price must be a valid non-negative number",
    },
  ),
  // price: z
  //   .string()
  //   .refine((val) => !isNaN(parseFloat(val.replace(/,/g, ""))), {
  //     message: "Price must be a valid number",
  //   })
  //   .transform((val) => parseFloat(val.replace(/,/g, ""))),

  quantity: z.number().min(0, "Quantity must be non-negative"),
  category: z.object({
    pk: z.string().min(1, "Category is required"), // Include pk
    value: z.string(),
    label: z.string(),
  }),
  tag: z.array(z.string()).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

// const CATEGORIES = [
//   { value: "laptop", label: "Laptop", pk: "1" }, // Add a pk field
//   { value: "fruit", label: "Fruit", pk: "2" },
//   { value: "vegetable", label: "Vegetable", pk: "3" },
// ];

const baseUrl = "https://backend.occupymart.com/api";

const TAGS = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

interface Category {
  id: number;
  category_image: string;
  category_name: string;
}

const AddProduct: React.FC = () => {
  const router = useRouter();
  const { id: supermarket_id } = router.query; // Correctly getting supermarket_id from the query
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userID = useAppSelector((state) => state.auth.userID);
  const profileID = useAppSelector(
    (state: { auth: { profileID: string } }) => state.auth.profileID,
  );

  const { data: supermarketsData, isLoading: isSupermarketsLoading } =
    useGetUserSupermarketsQuery(userID, { skip: !userID });

  const SUPERMARKETS =
    supermarketsData?.map((store: { id: string; name: string }) => ({
      value: store.id,
      label: store.name,
    })) || [];

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      supermarket: Array.isArray(supermarket_id)
        ? supermarket_id[0]
        : (supermarket_id as string) || "",
      productName: "",
      description: "",
      photo: undefined, // Change from "" to undefined
      price: "",
      quantity: 0,
      category: { value: "", label: "" }, // Update to match the new category object structure
      tag: [],
    },
  });
  console.log("add product form", form.getValues());

  const [categories, setCategories] = useState<
    Array<{
      value: string;
      label: string;
      pk: string;
    }>
  >([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await fetch(`${baseUrl}/admin/list-categories/`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data: Category[] = await response.json();

        // Transform the API data to match our Select component structure
        const formattedCategories = data.map((category) => ({
          label: category.category_name,
          value: category.id.toString(), // Convert id to string for the select value
          pk: category.id.toString(),
        }));

        console.log("formated categories:", formattedCategories);

        setCategories(formattedCategories);

        if (formattedCategories.length > 0) {
          toast({
            title: "Success",
            description: "Categories loaded successfully!",
            variant: "default",
          });
        } else {
          toast({
            title: "Notice",
            description: "No categories available.",
            variant: "default",
          });
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast({
          title: "Error",
          description: "Failed to fetch categories. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Uploaded file:", file);
      form.setValue("photo", file);
    } else {
      console.log("No file selected");
    }
  };

  // const formatPrice = (value: string) => {
  //   if (!value) return ""; // Handle empty input
  //   const number = parseFloat(value);
  //   return isNaN(number)
  //     ? value // If invalid, return as-is
  //     : number.toLocaleString("en-US", { minimumFractionDigits: 2 });
  // };

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return numPrice.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const [addProductMutation] = useAddProductMutation();

  const onSubmit = async (data: ProductFormData) => {
    console.log("Submitting Product Data:", data);
    console.log("Full category object:", data.category);
    console.log("Category value:", data.category.value);
    // console.log("Category data:", data.category);

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      console.log("FormData instance:", formData);
      console.log("FormData type:", typeof formData);
      console.log("Is FormData:", formData instanceof FormData);

      // Append all product details
      formData.append("name", data.productName);
      formData.append("description", data.description || "");
      formData.append("category", data.category.pk); // Use pk here
      formData.append("price", data.price.toString());
      formData.append("quantity", data.quantity.toString());
      if (data.photo) {
        formData.append("product_image", data.photo); // Ensure this is a File object
      }
      const numericPrice = parseFloat(data.price.replace(/,/g, ""));

      const response = await addProductMutation({
        supermarket_id: data.supermarket,
        name: data.productName,
        description: data.description || "",
        category: data.category.pk,
        // price: data.price,
        price: numericPrice.toString(),
        quantity: data.quantity.toString(),
        product_image: data.photo, // Ensure this is a File object
      });

      if (response.data) {
        toast({
          title: "Success",
          description: "Product added successfully!",
          variant: "default",
        });
        router.push(`/dashboard/inventory/${supermarket_id}`);
      } else {
        console.log(response.error);
        toast({
          title: "Error",
          description: "Failed to add product. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Full error details:", error);
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-2xl font-medium text-gray-700">
                Add Product
              </h1>
              <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
                Dashboard / Product List / Add Product
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
                {isSubmitting ? "Saving..." : "Save Product"}
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              {/* General Information Section */}
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">
                  General Information
                </h2>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="supermarket"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supermarket</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Supermarket" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SUPERMARKETS.map(
                              (market: { value: string; label: string }) => (
                                <SelectItem
                                  key={market.value}
                                  value={market.value}
                                >
                                  {market.label}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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

              {/* Media Section */}
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">Media</h2>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer rounded-lg border-2 border-dashed p-6 text-center"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Image
                        width={48}
                        height={48}
                        // alt="hello "
                        className="text-gray-400"
                      />
                      <p>Drag and drop image here, or click to upload</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">Pricing</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {/* <FormField
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  {/* <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="price"
                            placeholder="Enter price"
                            {...field}
                            onChange={(e) => {
                              // Remove any non-numeric characters except decimal point
                              const value = e.target.value.replace(
                                /[^\d.]/g,
                                "",
                              );
                              // Ensure only one decimal point
                              const parts = value.split(".");
                              if (parts.length > 2) {
                                parts.pop();
                              }
                              const cleanValue = parts.join(".");
                              field.onChange(cleanValue);
                            }}
                            onBlur={(e) => {
                              // Format on blur
                              const value = e.target.value;
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
                                  e.target.value = formatted;
                                  field.onChange(formatted);
                                }
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

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
                              // Remove non-numeric characters except decimal point and commas
                              let value = e.target.value.replace(
                                /[^\d.,]/g,
                                "",
                              );
                              // Ensure only one decimal point
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
                </div>
              </div>
            </div>

            {/* Category and Tags Section */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Category & Tags</h2>
              <div className="space-y-4">
                {/* <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const selectedCategory = categories.find(
                            (cat) => cat.value === value,
                          );
                          field.onChange(
                            selectedCategory || {
                              value: "",
                              label: "",
                              pk: "",
                            },
                          );
                        }}
                        value={field.value?.value}
                        disabled={loadingCategories}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                loadingCategories
                                  ? "Loading categories..."
                                  : categories.length === 0
                                    ? "No categories available"
                                    : "Select Category"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.length > 0 ? (
                            categories.map((category) => (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem disabled value="none">
                              No categories available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const selectedCategory = categories.find(
                            (cat) => cat.value === value,
                          );
                          field.onChange(
                            selectedCategory || {
                              value: "",
                              label: "",
                              pk: "",
                            },
                          );
                        }}
                        value={field.value?.value}
                        disabled={loadingCategories}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                loadingCategories
                                  ? "Loading categories..."
                                  : categories.length === 0
                                    ? "No categories available"
                                    : "Select Category"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.length > 0 ? (
                            categories.map((category) => (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem disabled value="none">
                              No categories available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="tag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <MultiSelect
                        options={TAGS}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Select tags"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddProduct;
