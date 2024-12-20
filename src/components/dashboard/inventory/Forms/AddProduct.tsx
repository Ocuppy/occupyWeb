/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
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
  price: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Price must be a valid number",
  }),
  quantity: z.number().min(0, "Quantity must be non-negative"),
  category: z.object({
    pk: z.string().min(1, "Category is required"), // Include pk
    value: z.string(),
    label: z.string(),
  }),
  tag: z.array(z.string()).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

const CATEGORIES = [
  { value: "laptop", label: "Laptop", pk: "1" }, // Add a pk field
  { value: "fruit", label: "Fruit", pk: "2" },
  { value: "vegetable", label: "Vegetable", pk: "3" },
];

const TAGS = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Uploaded file:", file);
      form.setValue("photo", file);
    } else {
      console.log("No file selected");
    }
  };

  const [addProductMutation] = useAddProductMutation();

  const onSubmit = async (data: ProductFormData) => {
    console.log("Submitting Product Data:", data);
    console.log("Full category object:", data.category);
    console.log("Category value:", data.category.value);

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
      formData.append("price", data.price);
      formData.append("quantity", data.quantity.toString());
      if (data.photo) {
        formData.append("product_image", data.photo); // Ensure this is a File object
      }

      const response = await addProductMutation({
        supermarket_id: data.supermarket,
        name: data.productName,
        description: data.description || "",
        category: data.category.pk,
        price: data.price,
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
                onClick={() => router.push("/dashboard/inventory")}
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
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter price"
                            {...field}
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
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const selectedCategory = CATEGORIES.find(
                            (cat) => cat.value === value,
                          );
                          field.onChange(
                            selectedCategory || {
                              value: "",
                              label: "",
                              pk: "",
                            },
                            // selectedCategory || { value: "", label: "" },
                          );
                        }}
                        value={field.value?.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
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

                <FormField
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
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddProduct;

// const router = useRouter();
// const { id: supermarket_id } = useRouter().query;
// const { toast } = useToast();
// const [isSubmitting, setIsSubmitting] = useState(false);
// // const [category, setCategory] = useState(""); // Ensure this is the primary key value
// const userID = useAppSelector((state) => state.auth.userID);
// const profileID = useAppSelector(
//   (state: { auth: { profileID: string } }) => state.auth.profileID,
// );

// const { data: supermarketsData, isLoading: isSupermarketsLoading } =
//   useGetUserSupermarketsQuery(userID, { skip: !userID });

// // Map fetched supermarkets to match the required format
// const SUPERMARKETS =
//   supermarketsData?.map((store: { id: string; name: string }) => ({
//     value: store.id,
//     label: store.name,
//   })) || [];

// const form = useForm<ProductFormData>({
//   resolver: zodResolver(productSchema),
//   defaultValues: {
//     supermarket: Array.isArray(supermarket_id)
//       ? supermarket_id[0]
//       : supermarket_id || "",
//     productName: "",
//     description: "",
//     photo: undefined, // Change from "" to undefined
//     price: "",
//     quantity: 0,
//     category: { value: "", label: "" }, // Update to match the new category object structure
//     tag: [],
//   },
// });

// const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//   const file = event.target.files?.[0];
//   if (file) {
//     console.log("Uploaded file:", file);
//     form.setValue("photo", file);
//   } else {
//     console.log("No file selected");
//   }
// };

// const [addProductMutation] = useAddProductMutation();
// const onSubmit = async (data: ProductFormData) => {
//   console.log("Submitting Product Data:", data);
//   console.log("Full category object:", data.category);
//   console.log("Category value:", data.category.value);

//   setIsSubmitting(true);
//   try {
//     const formData = new FormData();
//     console.log("FormData instance:", formData);
//     console.log("FormData type:", typeof formData);
//     console.log("Is FormData:", formData instanceof FormData);

//     // Append all product details
//     formData.append("name", data.productName);
//     formData.append("description", data.description || "");
//     // formData.append("category", data.category.value);?
//     formData.append("category", data.category.pk); // Use pk here
//     formData.append("price", data.price);
//     formData.append("quantity", data.quantity.toString());

//     const response = await addProductMutation({
//       supermarket_id: data.supermarket,
//       name: data.productName,
//       description: data.description || "",
//       category: data.category.pk,
//       // category: data.category.value,
//       // category: category,
//       price: data.price,
//       quantity: data.quantity.toString(),
//       product_image: data.photo, // Ensure this is a File object
//     });

//     if (response.data) {
//       toast({
//         title: "Success",
//         description: "Product added successfully!",
//         variant: "default",
//       });
//       router.push(`/dashboard/inventory/${supermarket_id}`);
//     } else {
//       console.log(response.error);
//       toast({
//         title: "Error",
//         description: "Failed to add product. Please try again.",
//         variant: "destructive",
//       });
//     }
//   } catch (error) {
//     console.error("Full error details:", error);
//     toast({
//       title: "Error",
//       description: "Failed to add product. Please try again.",
//       variant: "destructive",
//     });
//   } finally {
//     setIsSubmitting(false);
//   }
// };
